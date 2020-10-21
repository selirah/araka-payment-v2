import React from 'react';
import {
  CreditCardOutlined,
  PhoneOutlined,
  RocketOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Beneficiary } from '../../interfaces';
import { user as avatar } from '../../images/Images';
import { isEmpty } from '../../helpers/isEmpty';
import { modalTypes } from 'src/helpers/constants';

interface RecipientProps {
  beneficiary: Beneficiary;
  onShowModalClick(type: string, beneficiary: Beneficiary): void;
  onDeleteBenefiaryClick(type: string, beneficiaryId: number): void;
}

export const Recipient: React.FC<RecipientProps> = ({
  beneficiary,
  onShowModalClick,
  onDeleteBenefiaryClick,
}) => {
  return (
    <div className="contact">
      <img src={avatar} alt="contact-profile" />
      <div className="contact-detail">
        <h4>{beneficiary.name}</h4>
        <h6>
          {!isEmpty(beneficiary.bankAccount)
            ? beneficiary.bankAccount
            : beneficiary.studentId}
        </h6>
      </div>
      <div className="edit-beneficiary">
        {!isEmpty(beneficiary.bankAccount) ? (
          <button className="btn btn-primary mr-2">
            <CreditCardOutlined /> Send Money
          </button>
        ) : null}
        {!isEmpty(beneficiary.phoneNumber) ? (
          <button className="btn btn-primary mr-2">
            <PhoneOutlined /> Topup Airtime
          </button>
        ) : null}
        {!isEmpty(beneficiary.studentId) ? (
          <button className="btn btn-primary mr-2">
            <RocketOutlined /> Pay Fees
          </button>
        ) : null}
        <button
          className="btn btn-primary mr-2"
          onClick={() =>
            onShowModalClick(modalTypes.EDIT_BENEFICIARY, beneficiary)
          }
        >
          <EditOutlined /> Edit
        </button>
        <button
          className="btn btn-primary"
          onClick={() =>
            onDeleteBenefiaryClick(
              modalTypes.DELETE_BENEFICIARY,
              beneficiary.beneficiaryId
            )
          }
        >
          <DeleteOutlined /> Delete
        </button>
      </div>
    </div>
  );
};
