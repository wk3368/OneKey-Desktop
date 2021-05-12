/* eslint-disable no-restricted-syntax */
import React, { FC, useEffect, useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sendFormEthereumActions from '@wallet-actions/send/sendFormEthereumActions';
import { Button } from '@trezor/components';
import { Translation, Image } from '@suite-components';
import { ActionSelect as Select } from '@suite-components/Settings';
import { AppState, Dispatch } from '@suite-types';

import Exception from '@wallet-components/AccountException';
import AccountMode from '@wallet-components/AccountMode';
import AccountAnnouncement from '@wallet-components/AccountAnnouncement';
import { MAX_WIDTH_WALLET_CONTENT } from '@suite-constants/layout';

import type Electron from 'electron';
import Explore from '@explore-views';

const ActionSelect = styled(Select)`
    width: 260px;
`;

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: ${MAX_WIDTH_WALLET_CONTENT};
    width: 100%;
    height: 100%;
`;

const OuterContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const ToastInfo = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 200px;
    height: 200px;
    align-items: center;
    border-radius: 24px;
    background: ${props => props.theme.BG_WHITE};
    box-shadow: 0 10px 80px 0 ${props => props.theme.BOX_SHADOW_MODAL};
`;

const Footer = styled.div`
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.theme.BG_WHITE};
    border-top: 1px solid ${props => props.theme.STROKE_GREY};
    padding: 0 24px;
`;

const TextInfo = styled.p`
    color: rgba(60, 60, 67, 0.6);
    font-size: 12px;
`;

const WebviewContainer = styled.div`
    #onekey-explore {
        margin: 0 auto;
    }
`;

enum CHAIN_SYMBOL_ID {
    eth = 1,
    kovan = 42,
    bsc = 56,
    okex = 66,
    heco = 128,
}
const CHAIN_SYMBOL_RPC = {
    [CHAIN_SYMBOL_ID.eth]: 'https://rpc.blkdb.cn/eth',
    [CHAIN_SYMBOL_ID.kovan]: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    [CHAIN_SYMBOL_ID.bsc]: 'https://rpc.blkdb.cn/bsc',
    [CHAIN_SYMBOL_ID.heco]: 'https://rpc.blkdb.cn/heco',
    [CHAIN_SYMBOL_ID.okex]: 'https://exchainrpc.okex.org',
};

const symbolToChainId = {
    ETH: CHAIN_SYMBOL_ID.eth,
    BSC: CHAIN_SYMBOL_ID.bsc,
    HECO: CHAIN_SYMBOL_ID.heco,
    OKT: CHAIN_SYMBOL_ID.okex,
};

const CHAIN_OPTIONS = [
    {
        label: '以太坊 Ethereum 主网络',
        value: CHAIN_SYMBOL_ID.eth,
    },
    {
        label: '币安智能链 BSC 主网',
        value: CHAIN_SYMBOL_ID.bsc,
    },
    {
        label: '火币生态链 HECO 主网',
        value: CHAIN_SYMBOL_ID.heco,
    },
    {
        label: '欧易交易链 OKEx 主网',
        value: CHAIN_SYMBOL_ID.okex,
    },
    {
        label: 'Kovan 测试网络',
        value: CHAIN_SYMBOL_ID.kovan,
    },
];

function updateUrlParameter(uri: string, key: string, value: string) {
    const i = uri.indexOf('#');
    const hash = i === -1 ? '' : uri.substr(i);
    uri = i === -1 ? uri : uri.substr(0, i);

    const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
        uri = uri.replace(re, `$1${key}=${value}$2`);
    } else {
        uri = `${uri + separator + key}=${value}`;
    }
    return uri + hash;
}

const mapStateToProps = (state: AppState) => ({
    selectedAccount: state.wallet.selectedAccount,
    language: state.suite.settings.language,
    theme: state.suite.settings.theme.variant,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            signWithPush: sendFormEthereumActions.signAndPublishTransactionInSwap,
        },
        dispatch,
    );

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const Container: FC<Props> = ({ selectedAccount, signWithPush }) => {
    const [ref, setRef] = useState<HTMLElement>();
    const [isLoading, setLoadingStatus] = useState(false);
    const [webviewRef, setWebviewRef] = useState<Electron.WebviewTag>();
    const [loadFailed, setLoadFailed] = useState(false);
    const [activeChainId, setActiveChainId] = useState<CHAIN_SYMBOL_ID | null>(null);
    const [dapp, setActiveDAppInfo] = useState<any>(null);

    const chainRPCUrl = activeChainId ? CHAIN_SYMBOL_RPC[activeChainId] : null;

    const { account } = selectedAccount;
    const unused = account?.addresses
        ? account?.addresses.unused
        : [
              {
                  path: account?.path,
                  address: account?.descriptor,
                  transfers: account?.history.total,
              },
          ];
    const freshAddress = unused[0];

    const setIsLoading = useCallback(
        val => {
            setLoadingStatus(val);
            if (val) {
                setTimeout(() => {
                    setIsLoading(false);
                }, 5000);
            }
        },
        [setLoadingStatus],
    );

    useEffect(() => {
        if (!ref) return;
        // @ts-expect-error
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        const observer = new MutationObserver((mutations: any) => {
            mutations.forEach((mutation: any) => {
                if (
                    Array.prototype.some.call(
                        mutation.addedNodes,
                        (node: Electron.WebviewTag) => node.id === 'onekey-explore',
                    )
                ) {
                    setWebviewRef(document.getElementById('onekey-explore') as Electron.WebviewTag);
                }
            });
        });
        observer.observe(ref, { childList: true });
    }, [ref]);

    const handleRef = useCallback(
        node => {
            setRef(node);
        },
        [setRef],
    );

    const handleReload = useCallback(() => {
        if (!webviewRef) return;
        setLoadFailed(false);
        setIsLoading(true);
        webviewRef?.reloadIgnoringCache?.();
    }, [webviewRef, setIsLoading]);

    const handleBack = useCallback(() => {
        if (!webviewRef) return;
        setLoadFailed(false);
        setIsLoading(true);
        setActiveDAppInfo(null);
        setActiveChainId(null);
        try {
            webviewRef?.loadURL(`https://dapp.onekey.so/`);
        } catch (e) {
            // ignore
        }
    }, [webviewRef, setIsLoading]);

    useEffect(() => {
        async function main() {
            if (!dapp?.url || !webviewRef) return;

            const currentUrl = updateUrlParameter(
                dapp?.url,
                'config',
                JSON.stringify({
                    address: `${freshAddress.address}`,
                    rpcUrl: encodeURIComponent(chainRPCUrl!),
                    chainId: activeChainId,
                    debug: true,
                }),
            );
            try {
                setIsLoading(true);
                await webviewRef?.loadURL(currentUrl);
            } catch (e) {
                // ignore
            }
        }
        main();
    }, [dapp?.url, activeChainId, chainRPCUrl, webviewRef, freshAddress.address, setIsLoading]);

    useEffect(() => {
        if (!ref) return;
        // React 会删除 allowpopups 属性
        const currentUrl = `https://dapp.onekey.so/`;

        ref.innerHTML = `
            <webview
                allowpopups
                sandbox
                enableremotemodule
                id="onekey-explore"
                src=${currentUrl}
                useragent="Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; Nexus One Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
                preload="file://${window.INJECT_PATH}?timestamp=${new Date().getTime()}"
                style="width: 100%; height: 100%;"
            />
        `;
        const exploreRef = document.getElementById('onekey-explore');

        function domReadyEvent() {
            setIsLoading(false);
        }
        exploreRef?.addEventListener('dom-ready', domReadyEvent);
        return () => {
            exploreRef?.removeEventListener('dom-ready', domReadyEvent);
        };
    }, [ref, setIsLoading]);

    useEffect(() => {
        if (!webviewRef) return;
        function didFailLoading() {
            // setLoadFailed(true);
            setIsLoading(false);
        }

        async function registerEvent(event: Electron.IpcMessageEvent) {
            if (!webviewRef) return;
            const arg = event.args[0];
            if (event.channel === 'sign/transaction') {
                const { id, transaction } = arg;
                const params = {
                    ...transaction,
                    chainId: activeChainId,
                    rpcUrl: chainRPCUrl,
                };
                try {
                    const txid = await signWithPush(params, ({ type: 'final' } as unknown) as any);
                    webviewRef.send('sign/broadcast', {
                        id,
                        txid,
                    });
                } catch (e) {
                    webviewRef.send('sign/broadcast', {
                        id,
                        error: e,
                    });
                }
            } else if (event.channel === 'open/dapp') {
                const { payload } = arg;
                setActiveDAppInfo(payload);
                const chainId = symbolToChainId[payload.chain as 'ETH'];
                setActiveChainId(chainId);
            } else if (event.channel === 'open/link') {
                const { id, payload } = arg;
                const link = payload.trim();
                setActiveDAppInfo({
                    code: id,
                    url: link.startsWith('http') ? link : `https://${link}`,
                });
            } else if (event.channel === 'get/config') {
                const { id } = arg;

                const chainRPCUrl = CHAIN_SYMBOL_RPC[activeChainId!];

                try {
                    // eslint-disable-next-line no-underscore-dangle
                    for (const _i of new Array(3)) {
                        // eslint-disable-next-line no-await-in-loop
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        // eslint-disable-next-line no-await-in-loop
                        await webviewRef.send('response/config', {
                            id,
                            payload: {
                                address: `${freshAddress.address}`,
                                rpcUrl: chainRPCUrl,
                                chainId: activeChainId,
                                debug: true,
                            },
                        });
                    }
                } catch (e) {
                    // ingore
                }
            } else if (event.channel === 'request/account') {
                const { id } = arg;
                webviewRef.send('response/account', {
                    id,
                    address: freshAddress.address,
                });
            }
        }

        webviewRef.addEventListener('did-fail-load', didFailLoading);
        webviewRef.addEventListener('ipc-message', registerEvent);
        return () => {
            webviewRef.removeEventListener('did-fail-load', didFailLoading);
            webviewRef.removeEventListener('ipc-message', registerEvent);
        };
    }, [webviewRef, chainRPCUrl, activeChainId, signWithPush, freshAddress.address, setIsLoading]);

    if (selectedAccount.status === 'loading') {
        return (
            <ToastInfo>
                <Image width={160} height={160} image="SPINNER" />
            </ToastInfo>
        );
    }

    if (selectedAccount.status === 'exception') {
        return (
            <Wrapper key="explore-exception">
                <AccountMode mode={selectedAccount.mode} />
                <AccountAnnouncement selectedAccount={selectedAccount} />
                <Exception account={selectedAccount} />
            </Wrapper>
        );
    }

    return (
        <OuterContainer>
            {loadFailed && (
                <ToastInfo>
                    <Translation id="TR_LOAD_FAILED" />
                    <Button onClick={handleReload} style={{ marginTop: 12 }}>
                        <Translation id="TR_TRY_AGAIN" />
                    </Button>
                </ToastInfo>
            )}
            {dapp?.url && isLoading && (
                <ToastInfo>
                    <Image width={160} height={160} image="SPINNER" />
                </ToastInfo>
            )}
            <WebviewContainer
                style={{ width: '100%', height: dapp?.url ? 'calc(100% - 60px)' : '100%' }}
                ref={handleRef}
            />
            {!!dapp?.url && (
                <Footer>
                    <div>
                        <Image
                            style={{ cursor: 'pointer', marginRight: 24 }}
                            onClick={handleBack}
                            width={24}
                            height={24}
                            image="BACK"
                        />

                        <Image
                            style={{ cursor: 'pointer' }}
                            onClick={handleReload}
                            width={24}
                            height={24}
                            image="RELOAD"
                        />
                    </div>
                    <TextInfo>
                        您在第三方 DApp 上的使用行为将适用于第三方 DApp
                        的《隐私政策》和《用户协议》，由 {dapp.name || dapp.link}
                        直接并单独向您承担责任
                    </TextInfo>
                    <ActionSelect
                        isShowTop
                        hideTextCursor
                        useKeyPressScroll
                        noTopLabel
                        placeholder="请手动选择适合 DApp 的网络"
                        isDisabled={!!dapp?.name}
                        value={
                            activeChainId
                                ? {
                                      value: activeChainId,
                                      label:
                                          CHAIN_OPTIONS.find(item => item.value === activeChainId)
                                              ?.label ?? '',
                                  }
                                : null
                        }
                        options={CHAIN_OPTIONS}
                        onChange={(option: typeof CHAIN_OPTIONS[0]) => {
                            setActiveChainId(option.value);
                        }}
                        data-test="@explore/select"
                    />
                </Footer>
            )}
        </OuterContainer>
    );
};

const ExploreContainer: FC<Props> = props => {
    return <Explore key="explore" menu={<Container {...props} />} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);
