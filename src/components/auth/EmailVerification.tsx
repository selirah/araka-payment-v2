import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { isEmpty } from 'src/helpers/isEmpty';
import {
  verificationRequest,
  clearVerificationResponse,
} from '../../store/auth/actions';
import { Verification } from '../../interfaces';
import { Spinner } from '../common/Spinner';
import { path } from '../../helpers/path';
import { SpinnerContainer } from './Styles';
import { VerificationSuccess } from './VerificationSuccess';
import { VerificationFailure } from './VerificationFailure';

type Props = {
  processId: string | null;
};

const EmailVerification: React.FC<Props> = ({ processId }) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = appSelector((state) => state.auth);
  const [render, setRender] = useState<React.ReactNode>(
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );

  useEffect(() => {
    if (!isEmpty(processId) || processId !== undefined) {
      dispatch(clearVerificationResponse());
      const payload: Verification = {
        ProcessId: processId,
      };
      dispatch(verificationRequest(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { isSubmitting, verificationResponse } = auth;
    if (isSubmitting) {
      setRender(
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      );
    } else {
      if (!isEmpty(verificationResponse?.emailAddress)) {
        setRender(<VerificationSuccess />);
        setInterval(() => {
          window.location.href = path.login;
        }, 5000);
      } else {
        setRender(<VerificationFailure />);
      }
    }
  }, [auth]);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row justify-content-center d-flex">{render}</div>
      </div>
    </React.Fragment>
  );
};

export { EmailVerification };
