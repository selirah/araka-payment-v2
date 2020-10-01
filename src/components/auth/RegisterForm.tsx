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
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  ContainerFluid,
  ImageContainerRegister,
  FormContainer,
  FormBox,
  FormBoxHeader,
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
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [error, setError] = useState<Error | {}>({});
  const [singleError, setSingleError] = useState<string>('');
  const [phone, setPhone] = useState('');

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
      PhoneNumber: phone,
      Password: values.Password,
      IsBusiness: isBusiness,
    };
    dispatch(registerRequest(payload));
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
      history.push('/');
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
          <ImageContainerRegister className="col-lg-5 col-md-5 d-none d-md-block"></ImageContainerRegister>
          <FormContainer className="col-lg-7 col-md-7">
            <FormBox className="col-sm-5 text-center">
              <LogoContainer className="mt-0">
                <img src={logoNav} alt="logo" width="100" />
              </LogoContainer>
              <FormBoxHeader>
                <h4>Welcome to ARAKA Payments</h4>
              </FormBoxHeader>
              <FormBoxSubHeader>
                <h6>
                  Already a member? <Link to={path.login}>Log in</Link>
                </h6>
              </FormBoxSubHeader>
              {!isEmpty(error) ? <MultipleErrors error={error} /> : null}
              {!isEmpty(singleError) ? (
                <SingleError error={singleError} />
              ) : null}
              <form onSubmit={onSubmit}>
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
                  country="gh"
                  preferredCountries={['gh', 'cd', 'us', 'gb']}
                  onChange={setPhoneNumber}
                  containerStyle={{ marginBottom: '0.8rem' }}
                  inputStyle={{
                    width: '100%',
                    border: 'none',
                    borderRadius: '0',
                    padding: '1.5rem',
                    paddingLeft: '3rem',
                    color: '#000',
                    fontWeight: 'normal',
                  }}
                  buttonStyle={{
                    border: 'none',
                    background: '#fff',
                    padding: '0.2rem',
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
                <Button
                  type="submit"
                  title="Sign up"
                  isSubmitting={isSubmitting}
                  processTitle={t('register.processing')}
                />

                <div className="row">
                  <div className="col-sm-12 d-flex">
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
                </div>
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

export { RegisterForm };
