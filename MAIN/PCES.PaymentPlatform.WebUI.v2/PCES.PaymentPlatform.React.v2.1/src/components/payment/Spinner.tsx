import React from 'react';
import { spinnerIcon } from '../../images/Images';

export const Spinner: React.FC = () => {
  return (
    <div className="justify-content-center">
      <img src={spinnerIcon} alt="spinner" width="20" />
    </div>
  );
};
