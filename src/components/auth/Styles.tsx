import styled from 'styled-components';
import { media } from '../../helpers/media';
import {
  display_1,
  display_2,
  display_3,
  display_4,
  display_5,
  botVerification,
} from '../../images/Images';

export const ContainerFluid = styled.div`
  padding: 0;
`;

export const ImageContainerLogin = styled.div`
  background: url(${display_2}) center no-repeat #fff;
  background-size: cover;
  min-height: 100vh;
  box-shadow: 0.5rem 0 1rem rgba(255, 203, 170, 0.25) !important;
`;

export const ImageContainerRegister = styled.div`
  background: url(${display_5}) center no-repeat;
  background-size: cover;
  min-height: 100vh;
`;

export const ImageContainerForgotten = styled.div`
  background: url(${display_1}) center no-repeat;
  background-size: cover;
  min-height: 100vh;
`;

export const ImageEmailValidation = styled.div`
  background: url(${display_4}) center no-repeat;
  background-size: cover;
  min-height: 100vh;
`;

export const ImageRegisterSuccessful = styled.div`
  background: url(${display_3}) center no-repeat;
  background-size: cover;
  min-height: 100vh;
`;
export const MobileVerificationContainer = styled.div`
  background: url(${botVerification}) center no-repeat #fff;
  background-size: contain;
  min-height: 100vh;
  // box-shadow: 0.5rem 0 1rem rgba(255, 203, 170, 0.25) !important;
`;

export const MobileVerificationContainerMobile = styled.div`
  background: url(${botVerification}) center no-repeat #fff;
  background-size: 90% auto;
  min-height: 60vh;
  // box-shadow: 0.5rem 0 1rem rgba(255, 203, 170, 0.25) !important;
`;

export const FormContainer = styled.div`
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
`;

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

export const FormBoxHeader = styled.div`
  h4 {
    margin-top: 1.5rem;
    font-weight: 700;
    font-size: 1rem !important;
    color: #506077;
    font-style: italic;
    margin-bottom: 1rem;
  }
`;

export const FormBoxSubHeader = styled.div`
  h6 {
    font-weight: 400;
    font-size: 0.95rem !important;
    color: #506077;
    margin: 1.5rem 0;

    a {
      color: #f85924;
      border-bottom: 1px solid #f85924;
      text-decoration: none;
      padding-bottom: 0.2rem;
      transition: all 0.5s ease-in-out;

      :hover {
        color: #506077;
        border-bottom: 1px solid #506077;
      }
    }
  }
`;

export const FormBoxInput = styled.div`
  position: relative;
`;

// export const FormBoxInputText = styled.input`
//   width: 100%;
//   height: 3rem;
//   margin-bottom: 0.65rem;
//   border: none;
//   border-radius: 0;
//   outline: none;
//   background: #fff;
//   padding: 1rem;
//   color: #000;
//   font-weight: 400;

//   ::placeholder {
//     padding: 0;
//   }
// `;

export const FormBoxInputSpan = styled.span`
  position: absolute;
  top: 0.5rem;
  padding-left: 1.25rem;
  color: #777777;
`;

export const FormBoxCustomControl = styled.div`
  position: relative;
  z-index: 1;
  display: block;
  min-height: 1.5rem;

  label {
    font-size: 14px;
    font-weight: 300;
    cursor: pointer;
    margin-top: 0.5rem;
  }

  input[type='checkbox']:not(:checked) + label:before {
    background: transparent;
    border: 0.125rem solid #fbd5c7;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0;
    color: #506077;
  }

  input[type='checkbox']:checked ~ label::before {
    background-color: #f4744b;
    border: 0;
    border-radius: 0;
  }
`;

export const FormBoxCheckLabel = styled.label`
  color: #506077;
  font-weight: 700;
`;

export const ForgottenLink = styled.div`
  a {
    color: #506077;
    font-weight: 400;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    border-bottom: 1px solid #506077;
    padding-bottom: 0.2rem;
    transition: all 0.5s ease-in-out;
    font-size: 14px;

    :hover {
      color: #f4744b;
      border-bottom: 1px solid #f4744b;
    }
  }
`;

export const RegisterLink = styled.div`
  a {
    color: #f4744b;
    font-weight: 700;
    transition: all 0.3s ease-in-out;
    :hover {
      color: #506077;
    }
  }
`;

export const SubmitButton = styled.div`
  button[type='submit'] {
    border: none;
    cursor: pointer;
    padding-left: 2rem;
    padding-right: 2rem;
    height: 2.5rem;
    border-right: 0.3125rem;
    background-color: #f4744b;
    color: #fff;
    font-weight: 700;
    transition: 0.5s;
    border-radius: 16.5px;
    text-transform: uppercase;
    margin-bottom: 2rem;
    :hover {
      background-color: #506077;
    }
  }
`;

export const SmallIcon = styled.i`
  font-size: 1rem;
`;

export const NavTabsContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const NavLink = styled.a`
  border: 1px solid transparent;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  color: #506077;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  :hover,
  :active {
    color: #f4744b;
  }
`;

export const PassWrapper = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 14px;
`;

export const IconEye = styled.span`
  position: absolute;
  top: 20px;
  right: 1rem;
  color: #777777;
  padding-right: 0.5rem;

  :hover {
    color: #f4744b;
    cursor: pointer;
  }
`;

export const AlertContainer = styled.div`
  text-align: left;
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: 0;
  background-color: #ffbaba;
  color: #d8000c;

  p {
    color: #d8000c;
    margin-bottom: 0.2rem;
    text-transform: underlined;
  }
`;

export const ErrorSpan = styled.div`
  padding: 0;
  margin-bottom: 0.6rem;
  text-align: left;
  color: #f44336;
`;

export const LogoContainer = styled.div`
  margin: 0 auto;
`;

export const TermsContainer = styled.div`
  h4 {
    font-size: 12px;
    margin-top: 2rem;

    a {
      color: #f85924;
      border-bottom: 1px solid #f85924;
      text-decoration: none;
      padding-bottom: 0.2rem;
      transition: all 0.5s ease-in-out;

      :hover {
        color: #506077;
        border-bottom: 1px solid #506077;
      }
    }
  }
`;

export const SuccessHeader = styled.div`
  margin-bottom: 3rem;
  h4 {
    margin-top: 1.5rem;
    font-weight: 700;
    font-size: 1rem !important;
    color: #506077;
    font-style: italic;
  }
`;

export const SuccessContainer = styled.div`
  border: 0.0625rem solid #e0e0e0;
  padding: 1.75rem;
  margin-bottom: 2rem;
  position: relative;
  background: #fff;

  h2 {
    font-size: 1rem;
    margin-bottom: 1.3rem;
    font-weight: 700;
    color: #506077;
  }

  p {
    font-size: 0.8rem;
    text-align: left;
    line-height: 1.5rem;
    font-weight: 300;
  }

  img {
    width: 2rem;
    position: absolute;
    left: 1.2rem;
    top: 1.3rem;
    margin-right: 1.5rem;
  }
`;

export const ButtonLink = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2rem;

  a {
    background: #506077;
    color: #fff;
    border-radius: 0;
    font-weight: 700;
    text-transform: uppercase;
    padding: 0.75rem;
    transition: all 0.5s ease-in-out;

    :hover {
      background: #f85924;
      color: #fff;
    }
  }
`;

export const VerificationContainer = styled.div`
  position: relative;
  margin-top: 13rem;
  border: 0.0625rem solid #e0e0e0;
  padding: 1.75rem;
  width: 30rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.3rem;
    font-weight: 300;
    color: #506077;
    margin-left: 1rem;
  }

  p {
    font-size: 1rem;
    text-align: left;
    line-height: 1.5rem;
    font-weight: 200;
    margin-left: 1rem;
  }

  .success {
    width: 2rem;
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    margin-right: 1.5rem;
  }
  ${media.lessThan('sm')`
    margin-top:2rem;
  `}
`;

export const LoadingContainer = styled.div`
  color: #4bb543;
  font-size: 2rem;
  text-align: center;

  h6 {
    color: #fbbd19;
    font-size: 0.9rem;
    font-weight: 100;
  }
`;

export const VerificationButtonLink = styled.div`
  text-align: left;
  margin-left: 1rem;

  button {
    background: #d21919;
    color: #fff;
    border: none;
    border-radius: 0;
    padding: 0.8rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 300;
    transition: all 0.5s ease-in-out;
  }

  button:hover {
    background: #de1919;
    color: #fff;
  }
`;

export const SpinnerContainer = styled.div`
  position: relative;
  margin-top: 15rem;
  padding: 1.75rem;
  width: 30rem;
`;

export const VerifyButton = styled.button`
  border: 1px solid #f4744b;
  background: #f4744b;
  color: #fff;
  border-radius: 2px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-transform: uppercase;
  font-weight: 300;

  &:hover {
    background: #858796;
    border: 1px solid #858796;
    color: #fff;
  }

  a {
    text-decoration: none;
    color: #fff;
  }
`;
