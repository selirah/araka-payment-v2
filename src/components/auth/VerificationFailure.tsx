<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import { errorIcon } from '../../images/Images';
import { VerificationContainer, VerificationButtonLink } from './Styles';
import { path } from '../../helpers/path';

const VerificationFailure = () => {
  return (
    <React.Fragment>
      <VerificationContainer>
        <h2>
          <img src={errorIcon} alt="success" className="success" />
          Verification Failed
        </h2>
        <p>
          Oops..unfortunately your email verification was not successful. You
          can login to verify your email.
        </p>
        <VerificationButtonLink>
          <Link to={path.login}>
            <button className="btn">Return to Login</button>
          </Link>
        </VerificationButtonLink>
      </VerificationContainer>
    </React.Fragment>
  );
};
export { VerificationFailure };
=======
import React from 'react';
import { Link } from 'react-router-dom';
import { errorIcon } from '../../images/Images';
import { VerificationContainer, VerificationButtonLink } from './Styles';
import { path } from '../../helpers/path';

const VerificationFailure = () => {
  return (
    <React.Fragment>
      <VerificationContainer>
        <h2>
          <img src={errorIcon} alt="success" className="success" />
          Verification Failed
        </h2>
        <p>
          Oops..unfortunately your email verification was not successful. You
          can login to verify your email.
        </p>
        <VerificationButtonLink>
          <Link to={path.login}>
            <button className="btn">Return to Login</button>
          </Link>
        </VerificationButtonLink>
      </VerificationContainer>
    </React.Fragment>
  );
};
export { VerificationFailure };
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
