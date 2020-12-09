import React from 'react';
import { IMerchant } from '../../models/IMerchant';

interface IMerchantProps {
  merchant: IMerchant;
  onModalShowClick(merchant: IMerchant): void;
}

const Merchant: React.FC<IMerchantProps> = ({ merchant, onModalShowClick }) => {
  return (
    <React.Fragment>
      <div className="col-md-4 col-sm-8 payment_option_item">
        <img
          src={`data:image/jpeg;base64,${merchant.image}`}
          alt="logo"
          onClick={() => onModalShowClick(merchant)}
        />
        <p>{merchant.name}</p>
      </div>
    </React.Fragment>
  );
};

export { Merchant };
