import React from 'react';
import { Translation } from '@suite-components';
import { Loaders } from '@onboarding-components';
import { useDevice, useFirmware } from '@suite-hooks';
import { InitImg, H2 } from '@firmware-components';

const Body = () => {
    const { device } = useDevice();
    const { prevDevice } = useFirmware();
    return (
        <>
            <InitImg
                model={device?.features?.major_version || prevDevice?.features?.major_version || 1}
            />
            <H2>
                <Translation id="TR_INSTALLING" />
                <Loaders.Dots />
            </H2>
        </>
    );
};

export const BLEFirmwareProgressStep = {
    Body,
};
