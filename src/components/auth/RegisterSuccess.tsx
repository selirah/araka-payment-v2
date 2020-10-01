import React from 'react';
// import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChangeLanguage } from '../common/ChangeLanguage';
import { logoNav, exclamationIcon } from '../../images/Images';
import {
  ContainerFluid,
  ImageRegisterSuccessful,
  FormContainer,
  FormBox,
  LogoContainer,
  TermsContainer,
  SuccessContainer,
  ButtonLink,
  SuccessHeader,
} from './Styles';
import { path } from '../../helpers/path';

const RegisterSuccess: React.FC = () => {
  // const { t } = useTranslation();

  return (
    <React.Fragment>
      <ContainerFluid>
        <div className="row">
          <ImageRegisterSuccessful className="col-lg-5 col-md-4 d-none d-md-block"></ImageRegisterSuccessful>
          <FormContainer className="col-lg-7 col-md-7">
            <FormBox className="col-sm-5 text-center">
              <LogoContainer className="mt-0">
                <img src={logoNav} alt="logo" width="100" />
              </LogoContainer>
              <SuccessHeader>
                <h4>Welcome to ARAKA Payments</h4>
              </SuccessHeader>
              <form>
                <div className="row justify-content-center">
                  <SuccessContainer>
                    <h2>
                      <img src={exclamationIcon} alt="success" />
                      Your sign up was successful
                    </h2>
                    <p>
                      We have sent a verification email to the email address you
                      provided during the sign up. Kindly check your email and
                      click on the link there to verify your account.
                    </p>
                  </SuccessContainer>
                  <ButtonLink>
                    <Link to={path.login} className="btn">
                      Proceed to Login
                    </Link>
                  </ButtonLink>
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

export { RegisterSuccess };
