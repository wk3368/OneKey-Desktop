/* eslint-disable no-restricted-syntax */
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Electron from 'electron';
import { Transaction } from '@suite-actions/modalActions';
import { Image, Translation } from '@suite-components';
import AccountMode from '@wallet-components/AccountMode';
import AccountAnnouncement from '@wallet-components/AccountAnnouncement';
import Exception from '@wallet-components/AccountException';
import { Button, Icon, useTheme } from '@trezor/components';
import { Props } from './index';
import styled from 'styled-components';
import { ActionSelect as Select } from '@suite-components/Settings';
import { MAX_WIDTH_WALLET_CONTENT } from '@suite-constants/layout';

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

const ToolBar = styled.div`
    height: 4vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.theme.BG_WHITE};
    padding: 0.5vw 1vw;
`;

const AdressBarContainer = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    flex: 1;
    background: ${props => props.theme.BG_GREY};
    border-radius: 0.5vw;
    padding: 0 0.7vw;
    margin-right: 1vw;
`;

const AdressBar = styled.input`
    flex: 1;
    background: ${props => props.theme.BG_GREY};
`;

const WebviewContainer = styled.div`
    > * {
        margin: 0 auto;
    }
`;

enum CHAIN_SYMBOL_ID {
    eth = 1,
    kovan = 42,
    bsc = 56,
    okex = 66,
    heco = 128,
    okexTest = 65,
}

const CHAIN_SYMBOL_RPC = {
    [CHAIN_SYMBOL_ID.eth]: 'https://rpc.blkdb.cn/eth',
    [CHAIN_SYMBOL_ID.kovan]: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    [CHAIN_SYMBOL_ID.bsc]: 'https://rpc.blkdb.cn/bsc',
    [CHAIN_SYMBOL_ID.heco]: 'https://rpc.blkdb.cn/heco',
    [CHAIN_SYMBOL_ID.okex]: 'https://exchainrpc.okex.org',
    [CHAIN_SYMBOL_ID.okexTest]: 'https://exchaintestrpc.okex.org',
};

const symbolToChainId = {
    ETH: CHAIN_SYMBOL_ID.eth,
    BSC: CHAIN_SYMBOL_ID.bsc,
    HECO: CHAIN_SYMBOL_ID.heco,
    OKT: CHAIN_SYMBOL_ID.okex,
    OKT_TEST: CHAIN_SYMBOL_ID.okexTest,
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
    {
        label: '欧易交易链 OKEx 测试网',
        value: CHAIN_SYMBOL_ID.okexTest,
    },
];

const DISCOVERY_HOME_URL = `https://discover.test.onekey.so/`;

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

interface TabProps {
    dapp?: any;
    openTab: (dapp: any) => void;
}

export const Container: FC<Props & TabProps> = ({
    selectedAccount,
    signWithPush,
    openDeferredModal,
    addFavorite,
    getFavorite,
    removeFavorite,
    dapp: originalDapp,
    openTab,
}) => {
    const theme = useTheme();
    const [ref, setRef] = useState<HTMLElement>();
    const [isLoading, setLoadingStatus] = useState(false);
    const [webviewRef, setWebviewRef] = useState<Electron.WebviewTag>();
    const [dapp, setDapp] = useState(originalDapp);
    const webviewId = `${dapp?.url ?? 'home'}-onekey-explore`;
    const [loadFailed, setLoadFailed] = useState(false);
    const [activeChainId, setActiveChainId] = useState<CHAIN_SYMBOL_ID | null>(
        dapp?.chain ? symbolToChainId[dapp.chain as 'ETH'] : null,
    );

    const chainRPCUrl = activeChainId ? CHAIN_SYMBOL_RPC[activeChainId] : null;
    const [input, setInput] = useState(dapp?.url ?? 'home');

    // 前进后退
    const history = useRef([originalDapp?.url ?? DISCOVERY_HOME_URL]);
    const cursor = useRef(0);

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
                        (node: Electron.WebviewTag) => node.id === webviewId,
                    )
                ) {
                    setWebviewRef(document.getElementById(webviewId) as Electron.WebviewTag);
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
        if (!webviewRef || isLoading) return;
        setLoadFailed(false);
        setIsLoading(true);
        webviewRef?.reloadIgnoringCache?.();
    }, [webviewRef, isLoading, setIsLoading]);

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
        // TODO change back before merge
        ref.innerHTML = `
            <webview
                allowpopups
                sandbox
                enableremotemodule
                id="${webviewId}"
                src="${dapp?.url ?? DISCOVERY_HOME_URL}"
                useragent="Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; Nexus One Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
                preload="file://${window.INJECT_PATH}?timestamp=${new Date().getTime()}"
                style="width: 100%; height: 100%;"
            />
        `;
        const exploreRef = document.getElementById(webviewId);

        function domReadyEvent() {
            setIsLoading(false);
        }

        exploreRef?.addEventListener('dom-ready', domReadyEvent);
        return () => {
            exploreRef?.removeEventListener('dom-ready', domReadyEvent);
        };
    }, [dapp?.url, ref, setIsLoading]);

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
                try {
                    const params = {
                        ...transaction,
                        chainId: activeChainId,
                        rpcUrl: chainRPCUrl,
                    };
                    const alteredParams = (await openDeferredModal({
                        transaction: params,
                        type: 'change-gas',
                    } as any)) as Transaction;

                    const txid = await signWithPush(alteredParams, { type: 'final' } as any);
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
                openTab(payload);
            } else if (event.channel === 'open/link') {
                const { id, payload } = arg;
                const link = payload.trim();
                openTab({
                    code: id,
                    url: link.startsWith('http') ? link : `https://${link}`,
                    name: link,
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
            } else if (event.channel === 'common') {
                const { id, type, payload } = arg;
                if (type === 'favorite/get') {
                    webviewRef.send('common', {
                        id,
                        payload: getFavorite(),
                    });
                }
                if (type === 'favorite/remove') {
                    webviewRef.send('common', {
                        id,
                        success: removeFavorite(payload),
                    });
                }
            }
        }

        function handleNavigateInPage({ url }: { url: string }) {
            history.current.splice(
                cursor.current + 1,
                history.current.length - cursor.current + 1,
                url,
            );
            cursor.current = history.current.length - 1;
            setDapp({
                code: url,
                url,
                name: url,
            });
            setInput(url);
        }

        webviewRef.addEventListener('did-fail-load', didFailLoading);
        webviewRef.addEventListener('ipc-message', registerEvent);
        webviewRef.addEventListener('did-navigate-in-page', handleNavigateInPage);
        return () => {
            webviewRef.removeEventListener('did-fail-load', didFailLoading);
            webviewRef.removeEventListener('ipc-message', registerEvent);
            webviewRef.removeEventListener('did-navigate-in-page', handleNavigateInPage);
        };
    }, [webviewRef, chainRPCUrl, activeChainId, signWithPush, freshAddress.address, setIsLoading]);

    const handleHistoryButtons = useCallback(
        (isBackward: boolean) => {
            if (!webviewRef || isLoading) return;
            if (isBackward) {
                if (cursor.current <= 0) return;
                cursor.current--;
            } else {
                if (cursor.current >= history.current.length - 1) return;
                cursor.current++;
            }
            const url = history.current[cursor.current];
            setLoadFailed(false);
            setIsLoading(true);
            setDapp({
                code: url,
                url,
                name: url,
            });
            setInput(url);
            setActiveChainId(null);
            try {
                // TODO change back before merge
                webviewRef?.loadURL(url);
            } catch (e) {
                // ignore
            }
            console.log(history.current, cursor);
        },
        [webviewRef, isLoading, setIsLoading, input],
    );

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
                const url = input.startsWith('http') ? input : `https://${input}`;
                history.current.splice(
                    cursor.current + 1,
                    history.current.length - cursor.current + 1,
                    url,
                );
                cursor.current = history.current.length - 1;
                setLoadFailed(false);
                setIsLoading(true);
                setDapp({
                    code: url,
                    url,
                    name: url,
                });
                setActiveChainId(null);
                try {
                    // TODO change back before merge
                    webviewRef?.loadURL(url);
                } catch (e) {
                    // ignore
                }
                console.log(history.current, cursor);
            }
        },
        [input, setIsLoading, webviewRef],
    );

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
            {!!dapp?.url && (
                <ToolBar>
                    <Icon
                        size={24}
                        onClick={() => handleHistoryButtons(true)}
                        icon="ARROW_LEFT"
                        color={cursor.current <= 0 ? theme.TYPE_LIGHTER_GREY : theme.TYPE_DARK_GREY}
                    />
                    <Icon
                        size={24}
                        onClick={() => handleHistoryButtons(false)}
                        icon="ARROW_RIGHT"
                        color={
                            cursor.current >= history.current.length - 1
                                ? theme.TYPE_LIGHTER_GREY
                                : theme.TYPE_DARK_GREY
                        }
                    />
                    <Image
                        style={{ cursor: 'pointer', marginRight: 24 }}
                        onClick={handleReload}
                        width={24}
                        height={24}
                        image="RELOAD"
                    />
                    <AdressBarContainer>
                        <AdressBar
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Icon
                            size={24}
                            onClick={() =>
                                getFavorite().includes(dapp.code)
                                    ? removeFavorite(dapp.code)
                                    : addFavorite(dapp.code)
                            }
                            icon={getFavorite().includes(dapp.code) ? 'FAVORITE' : 'UNFAVORITE'}
                            color="#515151"
                        />
                    </AdressBarContainer>
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
                </ToolBar>
            )}
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
        </OuterContainer>
    );
};
