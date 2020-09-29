import styled from 'styled-components';
import { ecommerce_1 } from '../../images/Images';

export const ContainerFluid = styled.div`
  padding: 0;
`;

export const ImageContainer = styled.div`
  background: url(${ecommerce_1}) center no-repeat;
  background-size: cover;
  min-height: 100vh;
`;

export const FormContainer = styled.div`
  background-color: #f4f6f8;
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
    font-weight: 700;
    font-size: 0.8rem !important;
    color: #506077;
    text-transform: uppercase;
  }
`;

export const FormBoxInput = styled.div`
  position: relative;
`;

export const FormBoxInputText = styled.input`
  width: 100%;
  height: 2.5rem;
  margin-bottom: 0.65rem;
  border: none;
  border-radius: 0;
  outline: none;
  background: #fff;
  padding-left: 2.8125rem;

  ::placeholder {
    padding: 0;
  }
  :focus {
    border-bottom: 0.125rem solid #f4744b;
  }
`;

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

  input[type='checkbox']:not(:checked) + label:before {
    background: transparent;
    border: 0.125rem solid #506077;
    width: 0.9375rem;
    height: 0.9375rem;
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

export const LanguageContainer = styled.div`
  padding-left: 0;
`;

export const ForgottenLink = styled.div`
  a {
    color: #506077;
    font-weight: 700;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    :hover {
      color: #f4744b;
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
    width: 9.375rem;
    height: 2.5rem;
    border-right: 0.3125rem;
    background-color: #506077;
    color: #fff;
    font-weight: 400;
    transition: 0.5s;
    border-radius: 0;
    :hover {
      background-color: #f4744b;
    }
  }
`;

export const DropdownToggle = styled.a`
  color: #506077;
  text-decoration: none !important;
  font-weight: 700;
  :hover {
    color: #f4744b;
    font-weight: 700;
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
  top: 0.5rem;
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
