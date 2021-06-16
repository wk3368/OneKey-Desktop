import React, { useEffect, useState } from 'react';
import { Translation } from '@suite-components';
import { UserContextPayload } from '@suite-actions/modalActions';
import { fromWei, hexToNumberString, numberToHex, toWei } from 'web3-utils';
import styled from 'styled-components';
import { Input, Modal } from '@trezor/components';
import Web3 from 'web3';

const TransactionFee = styled.div`
    font-size: 0.75rem;
    line-height: 140%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    color: ${props => props.theme.BG_LIGHT_GREY};
`;

const TransactionFeeNum = styled.div`
    font-size: 1rem;
    line-height: 140%;
    margin-top: 0;
`;

const InputWrapper = styled.div`
    border: ${props => props.theme.TYPE_DARK_GREY};
    font-size: 1rem;
    margin-top: 8px;
    padding: 8px 8px;
    height: 265px;
    background: ${props => props.theme.BG_GREY_ALT};
    border-bottom: 1px solid ${props => props.theme.TYPE_LIGHTER_GREY};
    border-top: 1px solid ${props => props.theme.TYPE_LIGHTER_GREY};
    gap: 0.5rem;
`;

const InputRow = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
`;

const PreviewWrapper = styled.div`
    font-size: 0.75rem;
    line-height: 140%;
    background: ${props => props.theme.BG_LIGHT_GREY};
    padding: 15px 0;
    display: flex;
    flex-flow: column;
    color: ${props => props.theme.TYPE_DARK_GREY};
`;

const PreviewRow = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
`;

const ButtonWrapper = styled.div`
    display: grid;
    place-items: center;
`;

const StyledButton = styled.div`
    color: ${props => props.theme.TYPE_GREEN};
    border: 1px solid ${props => props.theme.TYPE_GREEN};
    border-radius: 6px;
    text-align: center;
    width: 200px;
    margin-top: 7px;
    margin-bottom: 14px;
`;

interface Props extends Extract<UserContextPayload, { type: 'change-gas' }> {
    onCancel: () => void;
}
// wrapper for shareable Fees component
const ChangeGas = (props: Props) => {
    const web3 = new Web3(props.transaction.rpcUrl);
    const [gasPrice, setGasPrice] = useState(
        props.transaction.gasPrice
            ? fromWei(hexToNumberString(props.transaction.gasPrice), 'Gwei')
            : '',
    );
    const [gasLimit, setGasLimit] = useState(hexToNumberString(props.transaction.gasLimit));

    useEffect(() => {
        if (!props.transaction.gasPrice) {
            web3.eth.getGasPrice().then(defaultGasPrice => {
                setGasPrice(fromWei(defaultGasPrice, 'Gwei'));
            });
        }
    }, [props.transaction.gasPrice]);

    const save = () => {
        if (gasLimit && gasPrice) {
            props.decision.resolve({
                ...props.transaction,
                gasPrice: numberToHex(toWei(gasPrice, 'Gwei')),
                gasLimit: numberToHex(gasLimit),
            });
            props.onCancel();
        }
    };
    const cancel = () => {
        props.decision.reject(Error('user canceled'));
        props.onCancel();
    };
    const getFeeETH = () => {
        try {
            return fromWei(String(parseFloat(toWei(gasPrice, 'Gwei')) * parseFloat(gasLimit)));
        } catch {
            return '0';
        }
    };
    const getValueETH = () => {
        try {
            return fromWei(hexToNumberString(props.transaction.value!));
        } catch {
            return '0';
        }
    };
    return (
        <Modal
            cancelable
            onCancel={cancel}
            heading={<Translation id="FEE" />}
            useFixedWidth
            fixedWidth={['360px', '360px', '360px', '360px']}
        >
            <div>
                <TransactionFee>
                    <Translation id="TR_BUMP_FEE" />
                </TransactionFee>
                <TransactionFeeNum>{getFeeETH()}ETH</TransactionFeeNum>
            </div>
            <InputWrapper>
                <InputRow>
                    <div>
                        <Translation id="TR_GAS_PRICE" /> (GWEI)
                    </div>
                    <Input value={gasPrice} onChange={e => setGasPrice(e.target.value)} />
                </InputRow>
                <InputRow>
                    <div>
                        <Translation id="TR_GAS_LIMIT" />
                    </div>
                    <Input value={gasLimit} onChange={e => setGasLimit(e.target.value)} />
                </InputRow>
            </InputWrapper>
            <PreviewWrapper>
                <PreviewRow>
                    <div>
                        <Translation id="AMOUNT" />
                    </div>
                    <div>{getValueETH()} ETH</div>
                </PreviewRow>
                <PreviewRow>
                    <div>
                        <Translation id="TR_BUMP_FEE" />
                    </div>
                    <div>{getFeeETH()} ETH</div>
                </PreviewRow>
                <PreviewRow>
                    <div>
                        <Translation id="AMOUNT" />(<Translation id="INCLUDING_FEE" />)
                    </div>
                    <div>{parseFloat(getFeeETH()) + parseFloat(getValueETH())} ETH</div>
                </PreviewRow>
            </PreviewWrapper>
            <ButtonWrapper>
                <StyledButton onClick={save}>Save</StyledButton>
            </ButtonWrapper>
        </Modal>
    );
};

export default ChangeGas;
