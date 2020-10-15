import React from 'react';
import { Beneficiary } from '../../interfaces';
import { user as avatar } from '../../images/Images';
import { isEmpty } from '../../helpers/isEmpty';
import { modalTypes } from 'src/helpers/constants';

interface RecipientProps {
  beneficiary: Beneficiary;
  onShowModalClick(type: string, beneficiary: Beneficiary): void;
}

export const Recipient: React.FC<RecipientProps> = ({
  beneficiary,
  onShowModalClick,
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
        <i
          className="fa fa-edit"
          onClick={() =>
            onShowModalClick(modalTypes.EDIT_BENEFICIARY, beneficiary)
          }
        ></i>
        <i className="fa fa-trash"></i>
      </div>
    </div>
  );
};
