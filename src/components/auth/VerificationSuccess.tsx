<<<<<<< HEAD
import React from 'react';
import { checkedIcon } from '../../images/Images';
import { VerificationContainer, LoadingContainer } from './Styles';

const VerificationSuccess = () => {
  return (
    <React.Fragment>
      <VerificationContainer>
        <h2>
          <img src={checkedIcon} alt="success" className="success" />
          Account Verified
        </h2>
        <p>
          Nice! We have successfully verified your account. Go ahead and login
          with password you used to sign up. Let's start making payments!
        </p>
        <LoadingContainer>
          <div className="fa fa-spinner fa-spin fa-fw text-center">
            <span className="sr-only">Loading...</span>
          </div>
          <h6>Redirecting to login...please wait..</h6>
        </LoadingContainer>
      </VerificationContainer>
    </React.Fragment>
  );
};
export { VerificationSuccess };
=======
import React from 'react';
import { checkedIcon } from '../../images/Images';
import { VerificationContainer, LoadingContainer } from './Styles';

const VerificationSuccess = () => {
  return (
    <React.Fragment>
      <VerificationContainer>
        <h2>
          <img src={checkedIcon} alt="success" className="success" />
          Account Verified
        </h2>
        <p>
          Nice! We have successfully verified your account. Go ahead and login
          with password you used to sign up. Let's start making payments!
        </p>
        <LoadingContainer>
          <div className="fa fa-spinner fa-spin fa-fw text-center">
            <span className="sr-only">Loading...</span>
          </div>
          <h6>Redirecting to login...please wait..</h6>
        </LoadingContainer>
      </VerificationContainer>
    </React.Fragment>
  );
};
export { VerificationSuccess };
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
