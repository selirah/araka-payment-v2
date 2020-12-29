import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { History } from 'history';
import { AppDispatch } from '../../helpers/appDispatch';
import { appSelector } from '../../helpers/appSelector';
import {
  registerRequest,
  resetErrorState,
  clearAuthState,
} from '../../store/auth/actions';
import { ChangeLanguage } from '../common/ChangeLanguage';
import { logo } from '../../images/Images';
import { TextInput } from './TextInput';
import { PasswordInput } from './PasswordInput';
import { MultipleErrors } from './MultipleErrors';
import { SingleError } from './SingleError';
import { Button } from './Button';
import { Register, Error } from '../../interfaces';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  ContainerFluid,
  ImageContainerLogin,
  FormContainer,
  FormBox,
  TermsContainer,
  FormBoxCustomControl,
  FormBoxCheckLabel,
  LogoContainer,
  FormBoxSubHeader,
} from './Styles';
import { isEmpty } from '../../helpers/isEmpty';
import { path } from '../../helpers/path';

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
    Confirm: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [error, setError] = useState<Error | {}>({});
  const [singleError, setSingleError] = useState<string>('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    dispatch(clearAuthState());
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

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setSingleError('');
    if (values.Password !== values.Confirm) {
      setSingleError('Passwords not match!');
    } else {
      const payload: Register = {
        Name: values.Name,
        EmailAddress: values.EmailAddress,
        PhoneNumber: phone,
        Password: values.Password,
        IsBusiness: isBusiness,
      };
      dispatch(registerRequest(payload));
    }
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
      setPhone('');
      history.push(path.registerSuccess);
    }
  }, [auth, history]);

  const setBusinessFlag = (): void => {
    setIsBusiness(!isBusiness);
  };

  const setPhoneNumber = (e: string) => {
    setPhone(e);
  };

  return (
    <React.Fragment>
      <ContainerFluid>
        <div className="row">
          <ImageContainerLogin className="col-lg-6 col-md-6 d-none d-md-block"></ImageContainerLogin>
          <FormContainer className="col-lg-6 col-md-6">
            <FormBox className="col-sm-7 text-center">
              <LogoContainer className="mt-0">
                <Link className="navbar-brand" to={path.home}>
                  <img src={logo} height="60" alt="Araka by ProxyPay" title="Araka by ProxyPay" />
                </Link>
              </LogoContainer>
              <FormBoxSubHeader>
                <h6>
                  Already a member? <Link to={path.login}>Log in</Link>
                </h6>
              </FormBoxSubHeader>
              {!isEmpty(error) ? <MultipleErrors error={error} /> : null}
              {!isEmpty(singleError) ? (
                <SingleError error={singleError} />
              ) : null}
              <form onSubmit={onSubmit} className="mt-4">
                <TextInput
                  type="text"
                  name="Name"
                  value={values.Name}
                  placeholder="Your full name or merchant name ..."
                  onChange={onChange}
                />
                <TextInput
                  type="email"
                  name="EmailAddress"
                  value={values.EmailAddress}
                  placeholder="Your email address ..."
                  onChange={onChange}
                />
                <PhoneInput
                  placeholder="Your phone number ..."
                  value={phone}
                  country="cd"
                  preferredCountries={['cd', 'gh', 'us', 'gb']}
                  onChange={setPhoneNumber}
                  containerStyle={{ marginBottom: '0.8rem' }}
                  inputStyle={{
                    border: '1px solid #fbd5c7',
                    padding: '1.5rem 2.5rem 1.5rem 3.5rem',
                    fontSize: ' 1.2rem',
                    backgroundColor: ' #fff',
                    height: '4rem',
                    display: 'block',
                    width: '100%',
                    fontWeight: 400,
                    lineHeight: '1.5',
                    color: '#495057',
                  }}
                  buttonStyle={{
                    border: 'none',
                    background: 'transparent',
                    padding: '0.2rem 1rem',
                    borderRadius: '0',
                  }}
                  dropdownStyle={{
                    textAlign: 'left',
                    fontSize: '0.8rem',
                    fontWeight: 'normal',
                  }}
                />
                <PasswordInput
                  type="password"
                  name="Password"
                  value={values.Password}
                  placeholder="Your password ..."
                  onChange={onChange}
                />
                <PasswordInput
                  type="password"
                  name="Confirm"
                  value={values.Confirm}
                  placeholder="Retype password ..."
                  onChange={onChange}
                />
                <div className="text-left mt-2 mb-5">
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
                      Register me as a merchant
                    </FormBoxCheckLabel>
                  </FormBoxCustomControl>
                </div>
                <Button
                  type="submit"
                  title="Sign up"
                  isSubmitting={isSubmitting}
                  processTitle={t('register.processing')}
                />

                <TermsContainer className="row">
                  <h4 className="mx-auto">
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

export { RegisterForm };
