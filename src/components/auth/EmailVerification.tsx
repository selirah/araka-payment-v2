import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { isEmpty } from 'src/helpers/isEmpty';
import { verificationRequest } from '../../store/auth/actions';
import { Verification, VerificationResponse } from '../../interfaces';
import { Spinner } from '../common/Spinner';
import { path } from '../../helpers/path';
import { SuccessContainer, ButtonLink } from './Styles';
import { exclamationIcon } from '../../images/Images';

type Props = {
  processId: string | null;
};

const EmailVerification: React.FC<Props> = ({ processId }) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = appSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [singleError, setSingleError] = useState<string>('');
  const [response, setResponse] = useState<VerificationResponse | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isEmpty(processId) || processId !== undefined) {
      const payload: Verification = {
        ProcessId: processId,
      };
      dispatch(verificationRequest(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { isSubmitting, verificationResponse, verifyError } = auth;
    setIsSubmitting(isSubmitting);

    setResponse(verificationResponse);
    if (response !== undefined && response.emailAddress !== undefined) {
      window.location.href = path.login;
    } else {
      setSingleError(verifyError);
    }
  }, [auth, response]);

  let render: React.ReactNode;

  if (isSubmitting) {
    render = <Spinner />;
  } else {
    render = (
      <React.Fragment>
        <SuccessContainer>
          <h2>
            <img src={exclamationIcon} alt="success" />
            {singleError}
          </h2>
          <p>OOps!...we could not verify your email at this time</p>
        </SuccessContainer>
        <ButtonLink>
          <Link to={path.login} className="btn">
            Return to Login
          </Link>
        </ButtonLink>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row justify-content-center">{render}</div>
      </div>
    </React.Fragment>
  );
};

export { EmailVerification };
