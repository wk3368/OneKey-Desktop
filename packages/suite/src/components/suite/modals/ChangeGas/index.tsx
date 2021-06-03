import React, { useState } from 'react';
import { Translation } from '@suite-components';
import { UserContextPayload } from "@suite-actions/modalActions";
import { fromWei, hexToNumberString, numberToHex, toWei } from "web3-utils";
import styled from "styled-components";
import { Input, Modal } from "@trezor/components";

const TransactionFee = styled.div`
  font-size: 0.75rem;
  line-height: 140%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  color: #888ea3;
`

const TransactionFeeNum = styled.div`
  font-size: 1rem;
  line-height: 140%;
  margin-top: 0;
`

const InputWrapper = styled.div`
  display: flex;
  border: black;
  font-size: 0.625rem;
  margin-top: 8px;
  padding: 0 8px;
  height: 265px;
  background: #f8f9fb;
  border-bottom: 1px solid #d2d8dd;
  border-top: 1px solid #d2d8dd;
  gap: 0.5rem;
`

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`

const PreviewWrapper = styled.div`
  font-size: 0.75rem;
  line-height: 140%;
  background: #fafcfe;
  padding: 15px 0;
  display: flex;
  flex-flow: column;
  color: #5d5d5d;
`

const PreviewRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
`

const StyledInput = styled.input`
  font-size: 1rem;
  line-height: 140%;
  direction: ltr;
  border: 1px solid #9b9b9b;
  border-radius: 4px;
  color: #5b5d67;
  height: 24px;
  width: 100%;
  padding-left: 8px;
  padding-top: 2px;
  margin-top: 7px;
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
            useFixedWidth={true}
            fixedWidth={["360px", "360px", "360px", "360px"]}
        >
            <div>
                <TransactionFee><Translation id="TR_BUMP_FEE" /></TransactionFee>
                <TransactionFeeNum>{getFeeETH()}ETH</TransactionFeeNum>
            </div>
            <InputWrapper>
                <InputRow>
                    <div><Translation id="TR_GAS_PRICE" /> (GWEI)</div>
                    <StyledInput value={gasPrice} onChange={e => setGasPrice(e.target.value)} />
                </InputRow>
                <InputRow>
                    <div><Translation id="TR_GAS_LIMIT" /></div>
                    <StyledInput value={gasLimit} onChange={e => setGasLimit(e.target.value)} />
                </InputRow>
            </InputWrapper>
            <PreviewWrapper>
                <PreviewRow>
                    <div><Translation id="AMOUNT" /></div>
                    <div>{getValueETH()} ETH</div>
                </PreviewRow>
                <PreviewRow>
                    <div><Translation id="TR_BUMP_FEE" /></div>
                    <div>{getFeeETH()} ETH</div>
                </PreviewRow>
                <PreviewRow>
                    <div><Translation id="AMOUNT" />(<Translation id="INCLUDING_FEE" />)</div>
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
