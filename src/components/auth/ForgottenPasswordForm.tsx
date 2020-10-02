import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { AppDispatch } from '../../helpers/appDispatch';
import { appSelector } from '../../helpers/appSelector';
// import { loginRequest } from '../../store/auth/actions';
import { ChangeLanguage } from '../common/ChangeLanguage';
import { logoNav } from '../../images/Images';
import { TextInput } from './TextInput';
import { Button } from './Button';
import { ForgottenPassword } from '../../interfaces';
import {
  ContainerFluid,
  ImageContainerLogin,
  FormContainer,
  FormBox,
  FormBoxHeader,
  LogoContainer,
  FormBoxSubHeader,
  TermsContainer,
} from './Styles';
import { path } from '../../helpers/path';

const ForgottenPasswordForm: React.FC = () => {
  // const dispatch: AppDispatch = useDispatch();
  const auth = appSelector((state) => state.auth);
  const { t } = useTranslation();
  const [values, setValues] = useState<ForgottenPassword>({
    EmailAddress: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onChange = (e: React.FormEvent<EventTarget>): void => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const payload: ForgottenPassword = {
      EmailAddress: values.EmailAddress,
    };
    // dispatch(loginRequest(payload));
    console.log(payload);
  };

  useEffect(() => {
    const { isSubmitting } = auth;
    setIsSubmitting(isSubmitting);
  }, [auth]);

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
              <FormBoxHeader>
                <h4>Reset your password</h4>
              </FormBoxHeader>
              <FormBoxSubHeader>
                <h6>
                  Remembered password? <Link to={path.login}>Log in</Link>
                </h6>
              </FormBoxSubHeader>
              <form onSubmit={onSubmit}>
                <TextInput
                  type="email"
                  name="EmailAddress"
                  value={values.EmailAddress}
                  placeholder="Your email"
                  onChange={onChange}
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

export { ForgottenPasswordForm };
