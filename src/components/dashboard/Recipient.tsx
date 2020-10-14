import React from 'react';
import { Beneficiary } from '../../interfaces';
import { user as avatar } from '../../images/Images';
import { isEmpty } from '../../helpers/isEmpty';

interface RecipientProps {
  recipient: Beneficiary;
}

export const Recipient: React.FC<RecipientProps> = ({ recipient }) => {
  return (
    <div className="contact">
      <img src={avatar} alt="contact-profile" />
      <div className="contact-detail">
        <h4>{recipient.name}</h4>
        <h6>
          {!isEmpty(recipient.bankAccount)
            ? recipient.bankAccount
            : recipient.studentId}
        </h6>
      </div>
    </div>
  );
};
