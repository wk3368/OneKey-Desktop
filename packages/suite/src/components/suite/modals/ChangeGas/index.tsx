import React, { useState } from 'react';
import { Modal, Translation } from '@suite-components';
import { UserContextPayload } from "@suite-actions/modalActions";
import { fromWei, hexToNumberString, numberToHex, toWei } from "web3-utils";
import styled from "styled-components";
import { Input } from "@trezor/components";

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0.5rem;
  border: black;
  background: lightgray;
  padding: 1rem 2rem 2rem;
`

const PreviewWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  border: black;
  padding: 1rem 2rem 2rem;
`

const StyledInput = styled(Input)`
  display: flex;
  flex: 1;
  min-width: 260px;
`;

const ButtonWrapper = styled.div`
  display: grid;
  place-items: center;
`;

const StyledButton = styled.div`
  color: ${props => props.theme.TYPE_GREEN};
  text-align: center;
  width: 200px;
  margin-top: 7px;
  margin-bottom: 14px;
`;

// wrapper for shareable Fees component
const ChangeGas = (props: Extract<UserContextPayload, { type: 'change-gas' }> & { onCancel: () => void }) => {
    const [gasPrice, setGasPrice] = useState(fromWei(hexToNumberString(props.transaction.gasPrice!), 'Gwei'));
    const [gasLimit, setGasLimit] = useState(hexToNumberString(props.transaction.gasLimit));
    const save = () => {
        props.decision.resolve({
            ...props.transaction,
            gasPrice: numberToHex(gasPrice),
            gasLimit: numberToHex(gasLimit)
        });
        props.onCancel();
    }
    const cancel = () => {
        props.decision.reject(Error('user canceled'));
        props.onCancel();
    }
    const getFeeETH = () => fromWei(String(parseFloat(toWei(gasPrice, 'Gwei')) * parseFloat(gasLimit)));
    const getValueETH = () => fromWei(hexToNumberString(props.transaction.value!));
    return (
        <Modal
            cancelable
            onCancel={cancel}
            heading={<Translation id="FEE" />}
        >
            <div>
                <div>Transaction Fee</div>
                <div>{getFeeETH()}ETH</div>
            </div>
            <InputWrapper>
                <div>Gas Price (GWEI)</div>
                <div>Gas Limit</div>
                <StyledInput value={gasPrice} onChange={e => setGasPrice(e.target.value)} />
                <StyledInput value={gasLimit} onChange={e => setGasLimit(e.target.value)} />
            </InputWrapper>
            <PreviewWrapper>
                <div>Send Amount</div>
                <div>{getValueETH()} ETH</div>
                <div>Transaction Fee</div>
                <div>{getFeeETH()} ETH</div>
                <div>New Total</div>
                <div>{parseFloat(getFeeETH()) + parseFloat(getValueETH())} ETH</div>
            </PreviewWrapper>
            <ButtonWrapper>
                <StyledButton onClick={save}>Save</StyledButton>
            </ButtonWrapper>
        </Modal>
    );
};

export default ChangeGas;
