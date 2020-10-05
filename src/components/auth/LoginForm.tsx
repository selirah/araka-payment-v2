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
import { logoNav } from '../../images/Images';
import { TextInput } from './TextInput';
import { PasswordInput } from './PasswordInput';
import { MultipleErrors } from './MultipleErrors';
import { SingleError } from './SingleError';
import { Button } from './Button';
import { Login, Error } from '../../interfaces';
import {
  ContainerFluid,
  ImageContainerLogin,
  FormContainer,
  FormBox,
  FormBoxHeader,
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
    const payload: Login = {
      EmailAddress: values.EmailAddress,
      Password: values.Password,
    };
    dispatch(loginRequest(payload));
  };

  useEffect(() => {
    const { isSubmitting, error, singleError, isAuthenticated } = auth;
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
  }, [auth, isPerformingPayment, history, dispatch]);

  return (
    <React.Fragment>
      <ContainerFluid>
        <div className="row">
          <ImageContainerLogin className="col-lg-5 col-md-4 d-none d-md-block"></ImageContainerLogin>
          <FormContainer className="col-lg-7 col-md-7">
            <FormBox className="col-sm-5 text-center">
              <LogoContainer className="mt-0">
                <img src={logoNav} alt="logo" width="100" />
              </LogoContainer>
              <React.Fragment>
                <FormBoxHeader>
                  <h4>Welcome back</h4>
                </FormBoxHeader>
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
                  <div className="col-12 col-md-8 text-left">
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
                    <h4 className="mx-auto">
                      By continuing, you accept our{' '}
                      <Link to="#">Terms of Use</Link> and{' '}
                      <Link to="#">Privacy Policy</Link>
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
