<<<<<<< HEAD
import React, { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../helpers/appDispatch';
import { appSelector } from '../../helpers/appSelector';
import { useHistory } from 'react-router-dom';
import { ChangeLanguage } from '../common/ChangeLanguage';
import { logoNav, exclamationIcon } from '../../images/Images';
import { clearAuthState } from '../../store/auth/actions';
import {
  ContainerFluid,
  ImageContainerLogin,
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
  const dispatch: AppDispatch = useDispatch();
  // const { t } = useTranslation();
  const auth = appSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    dispatch(clearAuthState());
    const { isAuthenticated } = auth;
    if (isAuthenticated) {
      history.push(path.home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
=======
import React, { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../helpers/appDispatch';
import { appSelector } from '../../helpers/appSelector';
import { useHistory } from 'react-router-dom';
import { ChangeLanguage } from '../common/ChangeLanguage';
import { logoNav, exclamationIcon } from '../../images/Images';
import { clearAuthState } from '../../store/auth/actions';
import {
  ContainerFluid,
  ImageContainerLogin,
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
  const dispatch: AppDispatch = useDispatch();
  // const { t } = useTranslation();
  const auth = appSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    dispatch(clearAuthState());
    const { isAuthenticated } = auth;
    if (isAuthenticated) {
      history.push(path.home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
