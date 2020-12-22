import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { AppDispatch } from '../../helpers/appDispatch';
import { appSelector } from '../../helpers/appSelector';
import {
  loginRequest,
  resetErrorState,
  clearVerificationResponse,
} from '../../store/auth/actions';
import { ChangeLanguage } from '../common/ChangeLanguage';
import { logo } from '../../images/Images';
import { TextInput } from './TextInput';
import { PasswordInput } from './PasswordInput';
import { MultipleErrors } from './MultipleErrors';
import { SingleError } from './SingleError';
import { Success } from '../common/Success';
import { Button } from './Button';
import { Login, Error } from '../../interfaces';
import {
  ContainerFluid,
  ImageContainerLogin,
  FormContainer,
  FormBox,
  ForgottenLink,
  TermsContainer,
  LogoContainer,
  FormBoxSubHeader,
  FormBoxCustomControl,
  FormBoxCheckLabel,
} from './Styles';
import { isEmpty } from '../../helpers/isEmpty';
import { path } from '../../helpers/path';

type Props = {
  history: History;
};

const LoginForm: React.FC<Props> = ({ history }) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = appSelector((state) => state.auth);
  const { isPerformingPayment } = appSelector((state) => state.payment);
  const { t } = useTranslation();
  const { verificationResponse } = auth;
  const [values, setValues] = useState<Login>({
    EmailAddress:
      verificationResponse?.emailAddress !== undefined
        ? verificationResponse?.emailAddress
        : '',
    Password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<Error | {}>({});
  const [singleError, setSingleError] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [isResetSuccess, setIsResetSuccess] = useState<boolean>(false);
  const [resetPasswordMessage, setResetPasswordMessage] = useState<string>('');

  useEffect(() => {
    const { isAuthenticated } = auth;
    if (isAuthenticated) {
      history.push(path.home);
    }
    dispatch(resetErrorState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e: React.FormEvent<EventTarget>): void => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setValues({ ...values, [name]: value });
  };

  const setRememberFlag = (): void => {
    setRemember(!remember);
  };

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(resetErrorState());
    setResetPasswordMessage('');
    setIsResetSuccess(false);
    const payload: Login = {
      EmailAddress: values.EmailAddress,
      Password: values.Password,
    };
    dispatch(loginRequest(payload));
  };

  useEffect(() => {
    const {
      isSubmitting,
      error,
      singleError,
      isAuthenticated,
      resetPasswordSuccess,
    } = auth;
    setIsSubmitting(isSubmitting);
    setError(error);
    setSingleError(singleError);
    if (isAuthenticated && isPerformingPayment) {
      dispatch(clearVerificationResponse());
      history.push(path.payment);
    } else if (isAuthenticated && !isPerformingPayment) {
      dispatch(clearVerificationResponse());
      history.push(path.dashboard);
    }
    if (resetPasswordSuccess) {
      setIsResetSuccess(resetPasswordSuccess);
      setResetPasswordMessage(
        'Your password has been reset successfully. Proceed to Login'
      );
    }
  }, [auth, isPerformingPayment, history, dispatch]);

  return (
    <React.Fragment>
      <ContainerFluid>
        <div className="row">
          <ImageContainerLogin className="col-lg-6 col-md-6 d-none d-md-block"></ImageContainerLogin>
          <FormContainer className="col-lg-6 col-md-6">
            <FormBox className="col-sm-7 text-center">
              <LogoContainer className="mt-0">
                <Link className="navbar-brand" to={path.home}>
                  <img src={logo} width="40" alt="" /> Araka
                </Link>
              </LogoContainer>
              <React.Fragment>
                <FormBoxSubHeader>
                  <h6>
                    New to ARAKA? <Link to={path.register}>Sign Up</Link>
                  </h6>
                </FormBoxSubHeader>
              </React.Fragment>
              {!isEmpty(error) ? <MultipleErrors error={error} /> : null}
              {!isEmpty(singleError) ? (
                <SingleError error={singleError} />
              ) : null}
              {isResetSuccess ? (
                <Success message={resetPasswordMessage} />
              ) : null}
              <form onSubmit={onSubmit} className="mt-4">
                <TextInput
                  type="text"
                  name="EmailAddress"
                  value={values.EmailAddress}
                  placeholder="Your email address ..."
                  onChange={onChange}
                />
                <PasswordInput
                  type="password"
                  name="Password"
                  value={values.Password}
                  placeholder="Your password ..."
                  onChange={onChange}
                />
                <div className="row mb-5">
                  <div className="col-12 col-md-8 text-left mt-1">
                    <FormBoxCustomControl className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        onClick={() => setRememberFlag()}
                        id="cb1"
                      />
                      <FormBoxCheckLabel
                        className="custom-control-label mt-0"
                        htmlFor="cb1"
                      >
                        Remember me on this device
                      </FormBoxCheckLabel>
                    </FormBoxCustomControl>
                  </div>
                  <div className="col-12 col-md-4 text-right">
                    <ForgottenLink>
                      <Link to={path.forgot}>{t('login.forgotten')}</Link>
                    </ForgottenLink>
                  </div>
                </div>
                <Button
                  type="submit"
                  title={t('login.btn_title')}
                  isSubmitting={isSubmitting}
                  processTitle={t('login.processing')}
                />
                <TermsContainer className="row mt-5">
                  <h4 className="mx-auto text-muted">
                    By continuing, you accept our{' '}
                    <Link to={path.terms}>Terms of Use</Link> and{' '}
                    <Link to={path.terms}>Privacy Policy</Link>
                  </h4>
                </TermsContainer>
              </form>
            </FormBox>
            <ChangeLanguage />
          </FormContainer>
        </div>
      </ContainerFluid>
    </React.Fragment>
  );
};

export { LoginForm };
