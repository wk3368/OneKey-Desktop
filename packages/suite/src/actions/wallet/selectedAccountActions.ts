import { ROUTER, SUITE, METADATA } from '@suite-actions/constants';
import { ACCOUNT, DISCOVERY, BLOCKCHAIN } from '@wallet-actions/constants';
import { NETWORKS } from '@wallet-config';

import * as discoveryActions from '@wallet-actions/discoveryActions';
import * as comparisonUtils from '@suite-utils/comparisonUtils';
import * as accountUtils from '@wallet-utils/accountUtils';

import { Action, Dispatch, GetState } from '@suite-types';
import { State, AccountWatchOnlyMode } from '@wallet-reducers/selectedAccountReducer';

export type SelectedAccountAction =
    | { type: typeof ACCOUNT.DISPOSE }
    | { type: typeof ACCOUNT.UPDATE_SELECTED_ACCOUNT; payload: State };

export const dispose = (): SelectedAccountAction => ({
    type: ACCOUNT.DISPOSE,
});

export const update = (payload: State): SelectedAccountAction => ({
    type: ACCOUNT.UPDATE_SELECTED_ACCOUNT,
    payload,
});

// Add notification to loaded SelectedAccountState
const getAccountStateWithMode = (selectedAccount?: State) => (
    _dispatch: Dispatch,
    getState: GetState,
) => {
    const state = getState();
    const { device, loaded } = state.suite;
    if (!device || !loaded) return;

    // From this point there could be multiple loaders
    const mode: AccountWatchOnlyMode[] = [];

    if (selectedAccount && selectedAccount.status === 'loaded') {
        const { account, discovery, network } = selectedAccount;
        // Account does exists and it's visible but shouldn't be active
        if (account && discovery && discovery.status < DISCOVERY.STATUS.STOPPING) {
            mode.push('account-loading-others');
        }

        // Backend status
        const blockchain = state.wallet.blockchain[network.symbol];
        if (!blockchain.connected && state.suite.online) {
            mode.push('backend-disconnected');
        }
    }

    // Account cannot be accessed
    if (!device.connected) {
        // device is disconnected
        mode.push('device-disconnected');
    } else if (device.authConfirm) {
        // device needs auth confirmation (empty wallet)
        mode.push('auth-confirm-failed');
    } else if (!device.available) {
        // device is unavailable (created with different passphrase settings)
        mode.push('device-unavailable');
    }

    return mode.length > 0 ? mode : undefined;
};

function buildDiscoveryParams(state: ReturnType<GetState>, discovery: any) {
    if (state.router.app === 'wallet' && state.router.params) {
        return state.router.params;
    }

    if (
        state.router.app === 'swap' ||
        state.router.app === 'explore' ||
        state.router.app === 'portfolio'
    ) {
        return {
            accountIndex: 0,
            accountType: 'normal' as const,
            symbol: 'eth',
        };
    }

    const symbol = discovery.networks[0];

    return {
        accountIndex: 0,
        accountType: symbol === 'btc' ? ('segwit' as const) : ('normal' as const),
        symbol,
    };
}

const getAccountState = () => (dispatch: Dispatch, getState: GetState) => {
    const state = getState();

    const { device } = state.suite;

    // waiting for device
    if (!device) {
        return {
            status: 'loading',
            loader: 'waiting-for-device',
        };
    }

    if (device.authFailed) {
        return {
            status: 'exception',
            loader: 'auth-failed',
        };
    }

    // waiting for discovery
    const discovery = dispatch(discoveryActions.getDiscoveryForDevice());
    if (!device.state || !discovery) {
        return {
            status: 'loading',
            loader: 'auth',
        };
    }

    const mode = dispatch(getAccountStateWithMode());

    if (
        (state.router.app === 'swap' || state.router.app === 'explore') &&
        !discovery.networks.includes('eth')
    ) {
        return {
            status: 'exception',
            loader: 'discovery-eth-empty',
            mode,
        };
    }

    // account cannot exists since there are no selected networks in settings/wallet
    if (discovery.networks.length === 0) {
        return {
            status: 'exception',
            loader: 'discovery-empty',
            mode,
        };
    }

    // get params from router
    // or set first default account from discovery list
    const params = buildDiscoveryParams(state, discovery);

    const network = NETWORKS.find(c => c.symbol === params.symbol)!;

    // account cannot exists since requested network is not selected in settings/wallet
    if (!discovery.networks.find(n => n === network.symbol)) {
        return {
            status: 'exception',
            loader: 'account-not-enabled',
            network,
            discovery,
            params,
            mode,
        };
    }

    const failed = discovery.failed.find(f => f.symbol === network.symbol);
    // discovery for requested network failed
    if (failed) {
        return {
            status: 'exception',
            loader: 'account-not-loaded',
            network,
            discovery,
            params,
            mode,
        };
    }

    // get selected account
    const account = accountUtils.getSelectedAccount(device.state, state.wallet.accounts, params);

    // account does exist
    if (account && account.visible) {
        // Success!
        const loadedState = {
            status: 'loaded',
            account,
            network,
            discovery,
            params,
            mode: undefined,
        } as const;
        const loadedMode = dispatch(getAccountStateWithMode(loadedState));
        return {
            ...loadedState,
            mode: loadedMode,
        };
    }

    // account doesn't exist (yet?) checking why...
    // discovery is still running
    if (discovery.error) {
        return {
            status: 'exception',
            loader: 'discovery-error',
            network,
            discovery,
            params,
            mode,
        };
    }

    if (discovery.status !== DISCOVERY.STATUS.COMPLETED) {
        return {
            status: 'loading',
            loader: 'account-loading',
        };
    }

    return {
        status: 'exception',
        loader: 'account-not-exists',
        network,
        discovery,
        params,
        mode,
    };
};

// list of all actions which has influence on "selectedAccount" reducer
// other actions will be ignored
const actions = [
    ROUTER.LOCATION_CHANGE,
    SUITE.SELECT_DEVICE,
    SUITE.UPDATE_SELECTED_DEVICE,
    METADATA.ACCOUNT_LOADED,
    METADATA.ACCOUNT_ADD,
    ...Object.values(ACCOUNT).filter(
        v =>
            typeof v === 'string' && v !== ACCOUNT.UPDATE_SELECTED_ACCOUNT && v !== ACCOUNT.DISPOSE,
    ), // exported values got unwanted "__esModule: true" as first element
    ...Object.values(BLOCKCHAIN).filter(v => typeof v === 'string'),
    ...Object.values(DISCOVERY).filter(v => typeof v === 'string'),
];

/*
 * Called from WalletMiddleware
 */
export const getStateForAction = (action: Action) => (dispatch: Dispatch, getState: GetState) => {
    // ignore not listed actions
    if (actions.indexOf(action.type) < 0) return;
    const state = getState();
    // ignore if not in wallet
    if (
        state.router.app !== 'wallet' &&
        state.router.app !== 'swap' &&
        state.router.app !== 'explore' &&
        state.router.app !== 'portfolio'
    )
        return;

    // get new state
    const newState = dispatch(getAccountState());
    if (!newState) return;

    // find differences
    const stateChanged = comparisonUtils.isChanged(state.wallet.selectedAccount, newState, {
        account: [
            'descriptor',
            'availableBalance',
            'misc',
            'tokens',
            'metadata',
            'addresses',
            'visible',
            'utxo',
        ],
        discovery: [
            'status',
            'index',
            // 'accountIndex',
            // 'interrupted',
            // 'completed',
            // 'waitingForBlockchain',
            // 'waitingForDevice',
        ],
    });

    if (stateChanged) {
        // update values in reducer
        dispatch({
            type: ACCOUNT.UPDATE_SELECTED_ACCOUNT,
            payload: newState,
        });
    }
};
