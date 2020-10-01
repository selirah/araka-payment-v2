import React from 'react';
import { SuccessContainer } from './Styles';
import { exclamationIcon } from '../../images/Images';

const VerificationSuccess = () => {
  return (
    <React.Fragment>
      <SuccessContainer>
        <h2>
          <img src={exclamationIcon} alt="success" />
          Account Verified
        </h2>
        <p>
          Nice! We have successfully verified your account. Go ahead and login
          with password you used to sign up. Let's start making payments!
        </p>
      </SuccessContainer>
    </React.Fragment>
  );
};
export { VerificationSuccess };
