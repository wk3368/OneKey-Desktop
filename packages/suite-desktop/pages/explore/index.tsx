import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sendFormEthereumActions from '@wallet-actions/send/sendFormEthereumActions';
import { AppState, Dispatch } from '@suite-types';
import Explore from '@explore-views';
import { openDeferredModal } from '@suite-actions/modalActions';
import { addFavorite, getFavorite, removeFavorite } from '@explore-actions/FavoriteActions';
import Tabs, { TabPane } from 'rc-tabs';
import { RenderTabBar } from 'rc-tabs/lib/interface';
import { Container } from './webview';

const mapStateToProps = (state: AppState) => ({
    selectedAccount: state.wallet.selectedAccount,
    language: state.suite.settings.language,
    theme: state.suite.settings.theme.variant,
    favorites: state.explore.favorite,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            signWithPush: sendFormEthereumActions.signAndPublishTransactionInSwap,
            openDeferredModal,
            addFavorite,
            getFavorite,
            removeFavorite,
        },
        dispatch,
    );

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const StyledTabs = styled(Tabs)`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;

    .rc-tabs-content-holder {
        display: flex;
        flex: 1;
    }

    .rc-tabs-content {
        flex: 1;
    }
`;

const StyledTabPane = styled(TabPane)`
    height: 100%;
`;

const StyledTabBar = styled.div<{ show: boolean }>`
    display: ${props => (props.show ? 'flex' : 'none')};
`;

const StyledTabNode = styled.div<{ active: boolean }>`
    position: relative;
    min-width: 14vw;
    height: 3vw;
    font-size: 1vw;
    padding: 0 0.7vw;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => (props.active ? props.theme.BG_WHITE : props.theme.BG_GREY)};
    border-radius: 0.5vw 0.5vw 0 0;
    cursor: pointer;
    ${props =>
        !props.active &&
        css`
            &:after {
                content: '';
                background: ${props => props.theme.TYPE_DARK_GREY};
                position: absolute;
                bottom: 25%;
                right: 0;
                height: 50%;
                width: 1px;
            }
        `}
`;

const CloseButton = styled.div`
    &:after {
        content: '✖';
    }
`;

const ExploreContainer: FC<Props> = props => {
    const [tabs, setTabs] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('home');
    const openTab = useCallback((dapp: any) => {
        setTabs(p => {
            setActiveTab(`explore-${dapp.name}-${p.length}`);
            return [...p, dapp];
        });
    }, []);
    const closeTab = useCallback(index => {
        setTabs(p => {
            const newTabs = [...p];
            newTabs.splice(index, 1);
            return newTabs;
        });
    }, []);
    useEffect(() => {
        const parts = activeTab.split('-');
        const index = parts[parts.length - 1];
        if (tabs.length <= parseInt(index, 10)) {
            setActiveTab('home');
        }
    }, [activeTab, tabs]);
    const renderTabBar: RenderTabBar = props => {
        return (
            <StyledTabBar show={tabs.length > 0}>
                {props.panes.flat(1).map((node: ReactElement) => {
                    const parts = (node.key as string).split('-');
                    const index = parts[parts.length - 1];
                    return (
                        <StyledTabNode
                            key={node.key}
                            active={activeTab === node.key}
                            onClick={() => props.onTabClick(node.key)}
                        >
                            {node.props.tab}
                            {node.key !== 'home' && (
                                <CloseButton onClick={() => closeTab(parseInt(index, 10))} />
                            )}
                        </StyledTabNode>
                    );
                })}
            </StyledTabBar>
        );
    };
    const body = (
        <StyledTabs activeKey={activeTab} onChange={setActiveTab} renderTabBar={renderTabBar}>
            <StyledTabPane tab="home" key="home">
                <Container {...props} openTab={openTab} />
            </StyledTabPane>
            {tabs.map((dapp, index) => (
                <StyledTabPane tab={dapp.name} key={`explore-${dapp.name}-${index}`} forceRender>
                    <Container
                        key={`explore-${dapp.name}-${index}`}
                        {...props}
                        dapp={dapp}
                        openTab={openTab}
                    />
                </StyledTabPane>
            ))}
        </StyledTabs>
    );
    return <Explore key="explore" menu={body} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreContainer);
