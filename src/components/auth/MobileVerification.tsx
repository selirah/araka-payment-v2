import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { useHistory } from 'react-router-dom';
import {
  verificationRequest,
  clearVerificationResponse,
} from '../../store/auth/actions';
import { Verification } from '../../interfaces';
import { Spinner } from '../common/Spinner';
import { path } from '../../helpers/path';
import { ContainerFluid, MobileVerificationContainer, SpinnerContainer, MobileVerificationContainerMobile } from './Styles';
import { VerificationSuccess } from './VerificationSuccess';
import { VerificationFailure } from './VerificationFailure';
import { isEmpty } from '../../helpers/isEmpty';

type Props = {
  processId: string | null;
};

const MobileVerification: React.FC<Props> = ({ processId }) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = appSelector((state) => state.auth);
  const history = useHistory();
  const [render, setRender] = useState<React.ReactNode>(
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );

  useEffect(() => {
    dispatch(clearVerificationResponse());
    const { isAuthenticated } = auth;
    if (isAuthenticated) {
      history.push(path.home);
    } else {
      if (!isEmpty(processId) && processId !== undefined) {
        const payload: Verification = {
          ProcessId: processId,
        };
        dispatch(verificationRequest(payload))
      }
    }
  }, [processId]);

  useEffect(() => {
    const { isSubmitting, isVerified, verifyError } = auth;
    if (isSubmitting) {
      setRender(
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )
    } else {
      if (isVerified) {
        setRender(<VerificationSuccess />);
        setInterval(() => {
          history.push(path.login);
        }, 5000);
      } else {
        if (!isEmpty(verifyError)) {
          setRender(<VerificationFailure />);
        } else {
          setRender(
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          )
        }
      }
    }
  }, [auth, history]);

  return (
    <React.Fragment>
      <ContainerFluid>
        <div className="row">
          <MobileVerificationContainer className="col-lg-7 col-md-7 d-none d-md-block"></MobileVerificationContainer>
          <MobileVerificationContainerMobile className="col-sm-12 d-sm-block d-md-none"></MobileVerificationContainerMobile>
          <div className="col-sm-12 col-lg-5 col-md-5">
            <div className="container">
              <div className="row justify-content-center d-flex">{render}</div>
            </div>
          </div>
        </div>
      </ContainerFluid>
    </React.Fragment>
  )
};

export { MobileVerification };