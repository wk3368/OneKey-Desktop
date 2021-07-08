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
    flex: 1;

    .rc-tabs-content-holder {
        height: 100%;
    }

    .rc-tabs-content {
        height: 100%;
    }
`;

const StyledTabPane = styled(TabPane)`
    height: 100%;
`;

const StyledTabBar = styled.div`
    .rc-tabs-nav-list {
        display: flex;
    }
`;

const StyledTabNode = styled.div`
    background-color: ${props => props.theme.BG_WHITE};
    border: 2px solid ${props => props.theme.STROKE_GREY};
    border-radius: 6px;
    cursor: pointer;
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
        if (tabs.length < 1) return <></>;
        const TabBar = StyledTabBar.withComponent(DefaultTabBar);
        return (
            <TabBar {...props}>
                {(node: ReactElement) => {
                    const parts = (node.key as string).split('-');
                    const index = parts[parts.length - 1];
                    return (
                        <StyledTabNode key={node.key}>
                            <div>{node}</div>
                            {node.key !== 'home' && <div onClick={() => closeTab(parseInt(index, 10))}>X</div>}
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
