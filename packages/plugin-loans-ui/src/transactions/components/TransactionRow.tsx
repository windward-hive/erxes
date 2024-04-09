import {
  Button,
  ButtonMutate,
  formatValue,
  FormControl,
  Icon,
  ModalTrigger,
  Tip,
  __
} from '@erxes/ui/src';
import _ from 'lodash';
import React from 'react';
import { TrNumberCols, TrRows } from '../../contracts/styles';
import ChangeTrForm from '../containers/ChangeTrForm';
import TransactionForm from '../containers/TransactionForm';
import { ITransaction } from '../types';
import EBarimtForm from './EBarimtForm';
type Props = {
  transaction: ITransaction;
  history: any;
  isChecked: boolean;
  toggleBulk: (transaction: ITransaction, isChecked?: boolean) => void;
};

function displayValue(transaction, name) {
  const value = _.get(transaction, name);
  return formatValue(value);
}

function displayNumber(transaction, name) {
  const value = _.get(transaction, name);
  return Number(String((value || 0).toFixed(2))).toLocaleString();
}

function TransactionRow({
  transaction,
  history,
  isChecked,
  toggleBulk
}: Props) {
  const onChange = e => {
    if (toggleBulk) {
      toggleBulk(transaction, e.target.checked);
    }
  };

  const onClick = e => {
    e.stopPropagation();
  };

  const renderChangeBtn = () => {
    if (!transaction.calcedInfo || !transaction.contractId) {
      return null;
    }

    const trAmountForm = props => (
      <ChangeTrForm {...props} transaction={transaction} />
    );
    return (
      <>
        <ModalTrigger
          title="Edit amounts info"
          trigger={
            <Tip text="Calculator" placement="left">
              <Icon icon="calcualtor" />
            </Tip>
          }
          size="lg"
          content={trAmountForm}
        />
        &nbsp; &nbsp;
      </>
    );
  };

  const renderEBarimtBtn = (isGotEBarimt: boolean) => {
    if (!transaction.calcedInfo || !transaction.contractId) {
      return null;
    }

    const ebarimtForm = props => (
      <EBarimtForm
        {...props}
        transaction={transaction}
        isGotEBarimt={isGotEBarimt}
      />
    );
    return (
      <>
        <ModalTrigger
          title="EBarimt info"
          trigger={
            isGotEBarimt ? (
              <Tip text="See Info" placement="left">
                <Icon icon="print" />
              </Tip>
            ) : (
              <Tip text="Get Ebarimt" placement="left">
                <Icon icon="invoice" />
              </Tip>
            )
          }
          size="lg"
          content={ebarimtForm}
        />
        &nbsp; &nbsp;
      </>
    );
  };

  const renderEditBrn = () => {
    if (transaction.futureDebt) {
      return null;
    }

    const trBaseForm = props => (
      <TransactionForm {...props} transaction={transaction} />
    );

    return (
      <ModalTrigger
        title={__('Edit basic info')}
        trigger={
          <Tip text="Edit" placement="left">
            <Icon icon="edit" />
          </Tip>
        }
        size="lg"
        content={trBaseForm}
      />
    );
  };

  return (
    <TrRows>
      <td onClick={onClick}>
        <FormControl
          checked={isChecked}
          componentClass="checkbox"
          onChange={onChange}
        />
      </td>

      <td key={'number'}>
        {(transaction && transaction.contract && transaction.contract.number) ||
          ''}{' '}
      </td>
      <td key={'description'}>{transaction.description || ''} </td>
      <td key={'payDate'}>{displayValue(transaction, 'payDate')}</td>
      <TrNumberCols key={'payment'}>
        {displayNumber(transaction, 'payment')}
      </TrNumberCols>
      <TrNumberCols key={'storedInterest'}>
        {displayNumber(transaction, 'storedInterest')}
      </TrNumberCols>
      <TrNumberCols key={'calcInterest'}>
        {displayNumber(transaction, 'calcInterest')}
      </TrNumberCols>
      <TrNumberCols key={'undue'}>
        {displayNumber(transaction, 'undue')}
      </TrNumberCols>
      <TrNumberCols key={'insurance'}>
        {displayNumber(transaction, 'insurance')}
      </TrNumberCols>
      <TrNumberCols key={'total'}>
        {displayNumber(transaction, 'total')}
      </TrNumberCols>
      <td key={'manage'}>
        {renderChangeBtn()}
        {renderEBarimtBtn(!!transaction.ebarimt)}
        {renderEditBrn()}
      </td>
    </TrRows>
  );
}

export default TransactionRow;
