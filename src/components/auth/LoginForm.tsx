import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { AppDispatch } from '../../helpers/appDispatch';
import { appSelector } from '../../helpers/appSelector';
import { loginRequest, resetErrorState } from '../../store/auth/actions';
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
  ImageContainer,
  FormContainer,
  FormBox,
  FormBoxHeader,
  ForgottenLink,
  RegisterLink,
} from './Styles';
import { isEmpty } from '../../helpers/isEmpty';
import { path } from '../../helpers/path';

// import { validateLoginInput } from '../../helpers/validation/login';
// import { Login } from '../../models/Login';

type Props = {
  history: History;
};

const LoginForm: React.FC<Props> = ({ history }) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = appSelector((state) => state.auth);
  const { isPerformingPayment } = appSelector((state) => state.payment);
  const { t } = useTranslation();
  const [values, setValues] = useState<Login>({
    EmailAddress: '',
    Password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<Error | {}>({});
  const [singleError, setSingleError] = useState<string>('');
  // const [clientValidation, setClientValidation] = useState<Login>({
  //   EmailAddress: '',
  //   Password: '',
  // });

  useEffect(() => {
    const { isAuthenticated } = auth;
    if (isAuthenticated && isPerformingPayment) {
      history.push(path.payment);
    } else if (isAuthenticated && !isPerformingPayment) {
      history.push(path.home);
    }
    dispatch(resetErrorState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e: React.FormEvent<EventTarget>): void => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const payload: Login = {
      EmailAddress: values.EmailAddress,
      Password: values.Password,
    };
    // const { errors, isValid } = validateLoginInput(payload);
    // if (!isValid) {
    //   setClientValidation(errors);
    // } else {
    //   dispatch(loginRequest(payload));
    // }
    dispatch(loginRequest(payload));
  };

  useEffect(() => {
    const { isSubmitting, error, singleError, isAuthenticated } = auth;
    setIsSubmitting(isSubmitting);
    setError(error);
    setSingleError(singleError);
    if (isAuthenticated && isPerformingPayment) {
      history.push(path.payment);
    } else if (isAuthenticated && !isPerformingPayment) {
      history.push(path.home);
    }
  }, [auth, isPerformingPayment, history]);

  return (
    <React.Fragment>
      <ContainerFluid>
        <div className="row">
          <ImageContainer className="col-lg-6 col-md-6 d-none d-md-block"></ImageContainer>
          <FormContainer className="col-lg-6 col-md-6">
            <FormBox className="col-lg-8 col-md-12 col-sm-9 col-xs-12 text-center">
              <div className="logo mb-3">
                <img src={logoNav} alt="logo" width="100" />
              </div>
              <FormBoxHeader className="mb-4">
                <h4>{t('login.header')}</h4>
              </FormBoxHeader>
              {!isEmpty(error) ? <MultipleErrors error={error} /> : null}
              {!isEmpty(singleError) ? (
                <SingleError error={singleError} />
              ) : null}
              <form onSubmit={onSubmit}>
                <TextInput
                  type="text"
                  name="EmailAddress"
                  value={values.EmailAddress}
                  placeholder={t('login.email')}
                  icon="fa-envelope"
                  // error={clientValidation ? clientValidation.EmailAddress : ''}
                  onChange={onChange}
                />
                <PasswordInput
                  type="password"
                  name="Password"
                  value={values.Password}
                  placeholder={t('login.password')}
                  icon="fa-lock"
                  // error={clientValidation ? clientValidation.Password : ''}
                  onChange={onChange}
                />
                <div className="row mb-3">
                  <ChangeLanguage />
                  <div className="col-6 text-right">
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
                <div className="text-center mb-3">
                  <RegisterLink>
                    {t('login.note')}{' '}
                    <Link to={path.register}>{t('login.register_note')}</Link>
                  </RegisterLink>
                </div>
              </form>
            </FormBox>
          </FormContainer>
        </div>
      </ContainerFluid>
    </React.Fragment>
  );
};

export { LoginForm };
