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
import { IForgottenPassword } from '../../models/IForgottenPassword';
import {
  ContainerFluid,
  ImageContainer,
  FormContainer,
  FormBox,
  FormBoxHeader,
  RegisterLink,
} from './styles/Styles';

const ForgottenPasswordForm: React.FC = () => {
  // const dispatch: AppDispatch = useDispatch();
  const auth = appSelector((state) => state.auth);
  const { t } = useTranslation();
  const [values, setValues] = useState<IForgottenPassword>({
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onChange = (e: React.FormEvent<EventTarget>): void => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const payload: IForgottenPassword = {
      email: values.email,
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
          <ImageContainer className="col-lg-6 col-md-6 d-none d-md-block"></ImageContainer>
          <FormContainer className="col-lg-6 col-md-6">
            <FormBox className="col-lg-8 col-md-12 col-sm-9 col-xs-12 text-center">
              <div className="logo mb-3">
                <img src={logoNav} alt="logo" width="100" />
              </div>
              <FormBoxHeader className="mb-4">
                <h4>{t('forgotten.header')}</h4>
              </FormBoxHeader>
              <form onSubmit={onSubmit}>
                <TextInput
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder={t('forgotten.email')}
                  icon="fa-envelope"
                  onChange={onChange}
                />
                <div className="row mb-3">
                  <ChangeLanguage />
                </div>
                <Button
                  type="submit"
                  title={t('forgotten.btn_title')}
                  isSubmitting={isSubmitting}
                  processTitle={t('forgotten.processing')}
                />
                <div className="text-center mb-3">
                  <RegisterLink>
                    {t('forgotten.note')}{' '}
                    <Link to="/auth/login">{t('forgotten.login_note')}</Link>
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

export { ForgottenPasswordForm };
