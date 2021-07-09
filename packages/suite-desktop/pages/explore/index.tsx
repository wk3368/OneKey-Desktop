import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
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
    display: ${props => (props.show ? 'unset' : 'none')};
    .rc-tabs-nav-list {
        display: flex;
        padding-top: 10px;
    }

    .rc-tabs-nav-operations {
        display: none;
    }
`;

const StyledTabNode = styled.div`
    position: relative;
    display: flex;
    background-color: ${props => props.theme.BG_WHITE};
    border: 2px solid ${props => props.theme.STROKE_GREY};
    border-radius: 6px;
    cursor: pointer;
`;

const CloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: red;
    color: white;
    transform: translate(50%, -50%);
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
    const renderTabBar: RenderTabBar = (props, DefaultTabBar) => {
        const TabBar = StyledTabBar.withComponent(DefaultTabBar);
        return (
            <TabBar {...props} show={tabs.length > 0}>
                {(node: ReactElement) => {
                    const parts = (node.key as string).split('-');
                    const index = parts[parts.length - 1];
                    return (
                        <StyledTabNode key={node.key}>
                            <div>{node}</div>
                            {node.key !== 'home' && (
                                <CloseButton onClick={() => closeTab(parseInt(index, 10))}>
                                    ✖
                                </CloseButton>
                            )}
                        </StyledTabNode>
                    );
                }}
            </TabBar>
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
