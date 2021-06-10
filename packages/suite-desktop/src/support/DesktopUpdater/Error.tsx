import React from 'react';
import styled from 'styled-components';

import { Button, H2, Link, variables } from '@trezor/components';
import { Translation, Modal } from '@suite-components';

const Description = styled.span`
    font-size: ${variables.FONT_SIZE.SMALL};
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    color: ${props => props.theme.TYPE_LIGHT_GREY};
`;

interface Props {
    hideWindow: () => void;
}

const Error = ({ hideWindow }: Props) => {
    return (
        <Modal
            heading={<Translation id="TOAST_AUTO_UPDATE_ERROR" values={{ state: '' }} />}
            cancelable
            onCancel={hideWindow}
        >
            <H2>
                <Translation id="TOAST_AUTO_UPDATE_ERROR_DESC" />
            </H2>
            <Description>
                <Link target="_blank" href="https://www.onekey.so/download?client=desktop">
                    <Button variant="primary" fullWidth>
                        <Translation id="DESKTOP_OUTDATED_BUTTON_DOWNLOAD" />
                    </Button>
                </Link>
            </Description>
        </Modal>
    );
};

export default Error;
