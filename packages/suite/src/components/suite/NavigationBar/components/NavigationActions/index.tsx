import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import * as walletSettingsActions from '@settings-actions/walletSettingsActions';
import * as suiteActions from '@suite-actions/suiteActions';
import * as routerActions from '@suite-actions/routerActions';
import { Translation } from '@suite-components';
import { findRouteByName } from '@suite-utils/router';
import { useAccountSearch, useActions, useAnalytics, useSelector } from '@suite-hooks';
import ActionItem from './components/ActionItem';
import { MAIN_MENU_ITEMS } from '@suite-constants/menu';
import { variables } from '@trezor/components';

interface ComponentProps {
    isActive: boolean;
    isDisabled?: boolean;
}

const ItemTitle = styled.span<ComponentProps>`
    ${props =>
        props.isDisabled &&
        css`
            cursor: default;
        `}
`;

const NewBadge = styled.span`
    padding: 1px 4px 0px 4px;
    background: ${props => props.theme.BG_LIGHT_GREEN};
    color: ${props => props.theme.TYPE_GREEN};
    letter-spacing: 0.2px;
    text-transform: UPPERCASE;
    font-size: 12px;
    display: flex;
    align-items: center;
    font-weight: ${variables.FONT_WEIGHT.DEMI_BOLD};
    border-radius: 4px;
`;

interface Props {
    closeMainNavigation?: () => void;
}

type Route = typeof MAIN_MENU_ITEMS[number]['route'] | 'settings-index' | 'notifications-index';

const NavigationActions = (props: Props) => {
    const analytics = useAnalytics();
    const { setCoinFilter, setSearchString } = useAccountSearch();
    const { activeApp, notifications, discreetMode } = useSelector(state => ({
        activeApp: state.router.app,
        notifications: state.notifications,
        discreetMode: state.wallet.settings.discreetMode,
        theme: state.suite.settings.theme,
    }));
    const { goto, setDiscreetMode } = useActions({
        goto: routerActions.goto,
        setDiscreetMode: walletSettingsActions.setDiscreetMode,
        setTheme: suiteActions.setTheme,
    });

    const gotoWithReport = (routeName: Route) => {
        switch (routeName) {
            case 'notifications-index':
                analytics.report({ type: 'menu/goto/notifications-index' });
                break;
            case 'settings-index':
                analytics.report({ type: 'menu/goto/settings-index' });
                break;
            case 'suite-index':
                analytics.report({ type: 'menu/goto/suite-index' });
                break;
            case 'wallet-index':
                setCoinFilter(undefined);
                setSearchString(undefined);
                analytics.report({ type: 'menu/goto/wallet-index' });
                break;
            default:
            // no default
        }
        goto(routeName);
    };

    const action = (route: Route) => {
        gotoWithReport(route);
        if (props.closeMainNavigation) props.closeMainNavigation();
    };

    const getIfRouteIsActive = (route: Route) => {
        const routeObj = findRouteByName(route);
        return routeObj ? routeObj.app === activeApp : false;
    };

    const unseenNotifications = useMemo(() => notifications.some(n => !n.seen), [notifications]);

    return (
        <nav className="flex flex-col flex-1 mt-6" aira-label="Sidebar">
            <div className="space-y-1">
                {MAIN_MENU_ITEMS.map(item => {
                    const { route, translationId, isDisabled, isBeta, icon } = item;
                    const routeObj = findRouteByName(route);
                    const isActive = routeObj ? routeObj.app === activeApp : false;
                    return (
                        <ActionItem
                            label={
                                <span className="relative flex justify-between w-full">
                                    <ItemTitle
                                        isActive={isActive}
                                        isDisabled={isDisabled}
                                        className="inline-flex"
                                    >
                                        <Translation id={translationId} />
                                    </ItemTitle>
                                    {/* if the button is disabled, display "SOON" badge */}
                                    {isDisabled && <NewBadge>soon</NewBadge>}
                                    {isBeta && <NewBadge>BETA</NewBadge>}
                                </span>
                            }
                            key={route}
                            data-test={`@suite/menu/${route}`}
                            onClick={() => action(route)}
                            isActive={isActive}
                            icon={icon as any}
                        />
                    );
                })}
            </div>
            <div className="mt-auto space-y-1">
                <ActionItem
                    label={<Translation id="TR_NOTIFICATIONS" />}
                    data-test="@suite/menu/notifications-index"
                    onClick={() => action('notifications-index')}
                    isActive={getIfRouteIsActive('notifications-index')}
                    icon="NOTIFICATION"
                    withAlertDot={unseenNotifications}
                />

                <ActionItem
                    label={<Translation id="TR_SETTINGS" />}
                    data-test="@suite/menu/settings-index"
                    onClick={() => action('settings-index')}
                    isActive={getIfRouteIsActive('settings-index')}
                    icon="SETTINGS"
                />

                <ActionItem
                    onClick={() => {
                        analytics.report({
                            type: 'menu/toggle-discreet',
                            payload: {
                                value: !discreetMode,
                            },
                        });
                        setDiscreetMode(!discreetMode);
                    }}
                    isActive={false}
                    label={<Translation id="TR_DISCREET" />}
                    icon={discreetMode ? 'HIDE' : 'SHOW'}
                />
            </div>
        </nav>
    );
};

export default NavigationActions;
