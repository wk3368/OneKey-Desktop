import React from 'react';

import { Translation } from '@suite-components';
import { useFirmware } from '@suite-hooks';
import { P, H2, ErrorImg } from '@firmware-components';

const Heading = () => <Translation id="TR_FIRMWARE_INSTALL_FAILED_HEADER" />;

const Body = () => {
    const { error } = useFirmware();
    const isErrorBatch = error === 'error batch device';
    return (
        <>
            <ErrorImg />
            <H2>
                {isErrorBatch ? (
                    '您的设备属于问题批次无法更新'
                ) : (
                    <Translation id="TR_FW_INSTALLATION_FAILED" />
                )}
            </H2>
            {/* yeah I know we shouldn't use something called TOAST_ here.. but it is so beautifully generic.. */}
            <P data-test="@firmware/error-message">
                <Translation
                    id="TOAST_GENERIC_ERROR"
                    values={{
                        error: isErrorBatch
                            ? '您的设备属于问题批次无法更新，请勿直接更新此设备！'
                            : error,
                    }}
                />
            </P>
        </>
    );
};

export const ErrorStep = {
    Heading,
    Body,
};
