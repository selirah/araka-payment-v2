import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AppDispatch } from '../../helpers/appDispatch';
import { appSelector } from '../../helpers/appSelector';
import {
  resetErrorState,
  resetPasswordRequest,
} from '../../store/auth/actions';
import { ChangeLanguage } from '../common/ChangeLanguage';
import { logo } from '../../images/Images';
import { PasswordInput } from './PasswordInput';
import { Button } from './Button';
import { ResetPassword } from '../../interfaces';
import {
  ContainerFluid,
  ImageContainerLogin,
  FormContainer,
  FormBox,
  FormBoxHeader,
  LogoContainer,
  TermsContainer,
} from './Styles';
import { isEmpty } from 'src/helpers/isEmpty';
import { path } from 'src/helpers/path';
import { SingleError } from './SingleError';

type Props = {
  processId: string | null;
};

const ResetPasswordForm: React.FC<Props> = ({ processId }) => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const auth = appSelector((state) => state.auth);
  const { t } = useTranslation();
  const [values, setValues] = useState<ResetPassword>({
    Password: '',
    ProcessId: processId === null ? '' : processId,
    Confirm: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [singleError, setSingleError] = useState<string>('');
  // const [isSccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const onChange = (e: React.FormEvent<EventTarget>): void => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    dispatch(resetErrorState());
    const { isAuthenticated } = auth;
    if (isAuthenticated) {
      history.push(path.home);
    }
    if (isEmpty(processId)) {
      history.push(path.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setIsError(false);
    setSingleError('');
    if (values.Password !== values.Confirm) {
      setIsError(true);
      setSingleError('Passwords not match!');
    } else {
      const payload: ResetPassword = {
        Password: values.Password,
        ProcessId: values.ProcessId,
      };
      dispatch(resetPasswordRequest(payload));
    }
  };

  useEffect(() => {
    const {
      isResettingPassword,
      resetPasswordSuccess,
      resetPasswordError,
      resetError,
    } = auth;
    setIsSubmitting(isResettingPassword);
    if (resetPasswordSuccess) {
      history.push(path.login);
    }
    if (resetPasswordError) {
      setIsError(resetPasswordError);
      setSingleError(resetError);
    }
  }, [auth, history]);

  return (
    <React.Fragment>
      <ContainerFluid>
        <div className="row">
          <ImageContainerLogin className="col-lg-5 col-md-4 d-none d-md-block"></ImageContainerLogin>
          <FormContainer className="col-lg-7 col-md-7">
            <FormBox className="col-sm-5 text-center">
              <LogoContainer className="mt-0">
                <Link className="navbar-brand" to={path.home}>
                  <img src={logo} width="40" alt="" /> Araka
                </Link>
              </LogoContainer>
              <FormBoxHeader>
                <h4>Reset your password</h4>
              </FormBoxHeader>
              {isError ? <SingleError error={singleError} /> : null}
              <form onSubmit={onSubmit}>
                <PasswordInput
                  type="password"
                  name="Password"
                  value={values.Password}
                  placeholder="Your password ..."
                  onChange={onChange}
                  required={true}
                />
                <PasswordInput
                  type="password"
                  name="Confirm"
                  value={values.Confirm}
                  placeholder="Retype password ..."
                  onChange={onChange}
                  required={true}
                />

                <Button
                  type="submit"
                  title={t('forgotten.btn_title')}
                  isSubmitting={isSubmitting}
                  processTitle={t('forgotten.processing')}
                />
                <TermsContainer className="row">
                  <div className="col-sm-12 d-flex mt-2">
                    <h4>
                      By continuing, you accept our{' '}
                      <Link to="#">Terms of Use</Link> and{' '}
                      <Link to="#">Privacy Policy</Link>
                    </h4>
                  </div>
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

export { ResetPasswordForm };
