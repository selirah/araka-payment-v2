import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { AppDispatch } from '../../helpers/appDispatch';
import { appSelector } from '../../helpers/appSelector';
import { registerRequest, resetErrorState } from '../../store/auth/actions';
import { ChangeLanguage } from '../common/ChangeLanguage';
import { logoNav } from '../../images/Images';
import { TextInput } from './TextInput';
import { PasswordInput } from './PasswordInput';
import { MultipleErrors } from './MultipleErrors';
import { SingleError } from './SingleError';
import { Button } from './Button';
import { Register, Error } from '../../interfaces';
import {
  ContainerFluid,
  ImageContainer,
  FormContainer,
  FormBox,
  FormBoxHeader,
  RegisterLink,
  FormBoxCustomControl,
  FormBoxCheckLabel,
} from './Styles';
import { isEmpty } from '../../helpers/isEmpty';
// import { validateRegisterInput } from '../../helpers/validation/register';
// import { Register } from '../../models/Register';

interface Props {
  history: History;
}

const RegisterForm: React.FC<Props> = ({ history }) => {
  const dispatch: AppDispatch = useDispatch();
  const auth = appSelector((state) => state.auth);
  const { t } = useTranslation();
  const [values, setValues] = useState<Register>({
    Name: '',
    EmailAddress: '',
    PhoneNumber: '',
    Password: '',
    IsBusiness: false,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [error, setError] = useState<Error | {}>({});
  const [singleError, setSingleError] = useState<string>('');
  // const [clientValidation, setClientValidation] = useState<Register>({
  //   Name: '',
  //   EmailAddress: '',
  //   PhoneNumber: '',
  //   Password: '',
  // });

  useEffect(() => {
    const { isAuthenticated } = auth;
    if (isAuthenticated) {
      history.push('/');
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
    const payload: Register = {
      Name: values.Name,
      EmailAddress: values.EmailAddress,
      PhoneNumber: values.PhoneNumber,
      Password: values.Password,
      IsBusiness: isBusiness,
    };
    dispatch(registerRequest(payload));

    // const { errors, isValid } = validateRegisterInput(payload);
    // if (isValid) {
    //   dispatch(registerRequest(payload));
    // } else {
    //   setClientValidation(errors);
    // }
  };

  useEffect(() => {
    const { isSubmitting, error, singleError, success } = auth;
    setIsSubmitting(isSubmitting);
    setError(error);
    setSingleError(singleError);
    if (success) {
      setValues({
        Name: '',
        EmailAddress: '',
        PhoneNumber: '',
        Password: '',
        IsBusiness: false,
      });
      history.push('/');
    }
  }, [auth, history]);

  const setBusinessFlag = (): void => {
    setIsBusiness(!isBusiness);
  };

  return (
    <React.Fragment>
      <ContainerFluid>
        <div className="row">
          <ImageContainer className="col-lg-6 col-md-6 d-none d-md-block"></ImageContainer>
          <FormContainer className="col-lg-6 col-md-6">
            <FormBox className="col-lg-8 col-md-12 col-sm-9 col-xs-12 text-center">
              <div className="logo mb-3">
                <img src={logoNav} alt="logo" width="80" />
              </div>
              <FormBoxHeader className="mb-4">
                <h4>{t('register.header')}</h4>
              </FormBoxHeader>
              {!isEmpty(error) ? <MultipleErrors error={error} /> : null}
              {!isEmpty(singleError) ? (
                <SingleError error={singleError} />
              ) : null}
              <form onSubmit={onSubmit}>
                <TextInput
                  type="text"
                  name="Name"
                  value={values.Name}
                  placeholder={t('register.name')}
                  icon="fa-building"
                  // error={clientValidation ? clientValidation.Name : ''}
                  onChange={onChange}
                />
                <TextInput
                  type="email"
                  name="EmailAddress"
                  value={values.EmailAddress}
                  placeholder={t('register.email')}
                  icon="fa-envelope"
                  // error={clientValidation ? clientValidation.EmailAddress : ''}
                  onChange={onChange}
                />
                <TextInput
                  type="text"
                  name="PhoneNumber"
                  value={values.PhoneNumber}
                  placeholder={t('register.phone')}
                  icon="fa-phone"
                  // error={clientValidation ? clientValidation.PhoneNumber : ''}
                  onChange={onChange}
                />
                <PasswordInput
                  type="password"
                  name="Password"
                  value={values.Password}
                  placeholder={t('register.password')}
                  icon="fa-lock"
                  // error={clientValidation ? clientValidation.Password : ''}
                  onChange={onChange}
                />
                <div className="row mb-2">
                  <div className="col-12 d-flex">
                    <FormBoxCustomControl className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        onClick={() => setBusinessFlag()}
                        id="cb1"
                      />
                      <FormBoxCheckLabel
                        className="custom-control-label"
                        htmlFor="cb1"
                      >
                        {!isBusiness
                          ? t('register.business')
                          : t('register.customer')}
                      </FormBoxCheckLabel>
                    </FormBoxCustomControl>
                  </div>
                </div>
                <div className="row mb-2">
                  <ChangeLanguage />
                </div>
                <Button
                  type="submit"
                  title={t('register.btn_title')}
                  isSubmitting={isSubmitting}
                  processTitle={t('register.processing')}
                />
                <div className="text-center mb-3">
                  <RegisterLink>
                    {t('register.note')}{' '}
                    <Link to="/auth/login" className="register-link">
                      {t('register.login_note')}
                    </Link>
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

export { RegisterForm };
