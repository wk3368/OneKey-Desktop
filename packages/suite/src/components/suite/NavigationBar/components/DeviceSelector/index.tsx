import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { variables, DeviceImage } from '@trezor/components';
import { SHAKE } from '@suite-support/styles/animations';
import { WalletLabeling } from '@suite-components';
import { TrezorDevice } from '@suite-types';
import * as routerActions from '@suite-actions/routerActions';
import { useAnalytics, useSelector, useActions } from '@suite-hooks';
import * as suiteActions from '@suite-actions/suiteActions';
import * as deviceUtils from '@suite-utils/device';
import DeviceStatus from './components/DeviceStatus';

const Wrapper = styled.div<{ triggerAnim?: boolean; isMobileLayout?: boolean }>`
    ${props =>
        props.triggerAnim &&
        css`
            animation: ${SHAKE} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden; /* used for hardware acceleration */
            perspective: 1000px; /* used for hardware acceleration */
        `}
`;

const DeviceImageWrapper = styled.div<{ lowerOpacity: boolean }>`
    ${props =>
        props.lowerOpacity &&
        css`
            opacity: 0.4;
        `}
`;

const needsRefresh = (device?: TrezorDevice) => {
    if (!device) return false;

    const deviceStatus = deviceUtils.getStatus(device);
    const needsAcquire =
        device.type === 'unacquired' ||
        deviceStatus === 'used-in-other-window' ||
        deviceStatus === 'was-used-in-other-window';
    return needsAcquire;
};

const DeviceSelector = (
    props: React.HTMLAttributes<HTMLDivElement> & { isMobileLayout?: boolean },
) => {
    const { selectedDevice, deviceCount } = useSelector(state => ({
        selectedDevice: state.suite.device,
        deviceCount: state.devices.length,
    }));
    const { goto, acquireDevice } = useActions({
        goto: routerActions.goto,
        acquireDevice: suiteActions.acquireDevice,
    });

    const [localCount, setLocalCount] = useState<number | null>(null);
    const [triggerAnim, setTriggerAnim] = useState(false);
    const [showTextStatus, setShowTextStatus] = useState(false);

    const countChanged = localCount && localCount !== deviceCount;
    const shakeAnimationTimerRef = useRef<number | undefined>(undefined);
    const stateAnimationTimerRef = useRef<number | undefined>(undefined);

    const analytics = useAnalytics();

    const deviceNeedsRefresh = needsRefresh(selectedDevice);

    const connectState = selectedDevice?.connected;

    useEffect(() => {
        // clear animation timers on unmount
        return () => {
            if (shakeAnimationTimerRef.current) clearTimeout(shakeAnimationTimerRef.current);
            if (stateAnimationTimerRef.current) clearTimeout(stateAnimationTimerRef.current);
        };
    }, []);

    useEffect(() => {
        // update previous device count
        setLocalCount(deviceCount);
    }, [deviceCount]);

    useEffect(() => {
        if (countChanged) {
            // different count triggers anim
            setTriggerAnim(true);
            // after 1s removes anim, allowing it to restart later
            shakeAnimationTimerRef.current = setTimeout(() => {
                // makes sure component is still mounted
                setTriggerAnim(false);
            }, 1000);
        }
    }, [countChanged]);

    useEffect(() => {
        // if the device status changes, show wallet state (dis/connected) as text for 2 seconds
        setShowTextStatus(true);
        stateAnimationTimerRef.current = setTimeout(() => {
            setShowTextStatus(false);
        }, 2000);
    }, [connectState]);

    return (
        <Wrapper
            onMouseEnter={() => setShowTextStatus(true)}
            onMouseLeave={() => setShowTextStatus(false)}
            data-test="@menu/switch-device"
            onClick={() =>
                goto('suite-switch-device', {
                    cancelable: true,
                }) && analytics.report({ type: 'menu/goto/switch-device' })
            }
            triggerAnim={triggerAnim}
            isMobileLayout={props.isMobileLayout}
            className="relative flex items-center p-2 transition rounded-md cursor-pointer focus:ring-brand md:shadow-sm md:border md:border-gray-200 md:mt-6 hover:bg-gray-50 md:dark:bg-white/5 md:dark:border-white/5"
            {...props}
        >
            {selectedDevice && (
                <>
                    <DeviceImageWrapper
                        className="w-[22px] bg-my px-px md:translate-x-2 lg:transform-none"
                        lowerOpacity={deviceNeedsRefresh}
                    >
                        <DeviceImage
                            height={36}
                            trezorModel={selectedDevice.features?.major_version === 1 ? 1 : 2}
                        />
                    </DeviceImageWrapper>
                    {/* Details */}
                    <div className="flex flex-col flex-1 pl-3 overflow-hidden md:hidden lg:flex self-baseline">
                        {/* Wallet Brand */}
                        <div className="min-w-0 font-medium text-gray-900 truncate dark:text-white/90">
                            {selectedDevice.label}
                        </div>
                        {/* Wallet Name */}
                        <div className="min-w-0 text-xs font-medium text-gray-500 truncate mt-0.5 dark:text-white/50">
                            {selectedDevice.metadata.status === 'enabled' &&
                            selectedDevice.metadata.walletLabel ? (
                                selectedDevice.metadata.walletLabel
                            ) : (
                                <WalletLabeling device={selectedDevice} />
                            )}
                        </div>
                    </div>
                    <DeviceStatus
                        showTextStatus={showTextStatus}
                        showIconStatus={!showTextStatus}
                        device={selectedDevice}
                        onRefreshClick={
                            deviceNeedsRefresh
                                ? () => {
                                      acquireDevice(selectedDevice);
                                  }
                                : undefined
                        }
                    />
                </>
            )}
        </Wrapper>
    );
};

export default DeviceSelector;
