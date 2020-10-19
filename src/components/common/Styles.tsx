import styled, { keyframes } from 'styled-components';

export const SpinnerContainer = styled.div`
  color: #fbbd19;
`;
export const SmallIcon = styled.i`
  font-size: 1rem;
`;
export const LanguageContainer = styled.div`
  background: #f4f6f8;
  position: absolute;
  right: 3rem;
  top: 1rem;

  i {
    margin-right: 1rem;
    cursor: pointer;
  }
`;

export const DropdownToggle = styled.a`
  color: #506077;
  text-decoration: none !important;
`;
export const AlertContainer = styled.div`
  text-align: left;
  font-size: 16px;
  font-weight: normal;
  border-radius: 0;
  background-color: #ffbaba;
  color: #d8000c;
  display: table;
  margin: 1rem auto;
  float: none;

  p {
    color: #d8000c;
    margin-bottom: 0.2rem;
    text-transform: underlined;
  }
`;

const Flash = keyframes`
  14% { font-size: 1rem; color: #155724; background: #d4edda; }
  28% { font-size: 1rem; color: initial; background: initial; }
  42% { font-size: 1rem; }
  57% { font-size: 0.95rem; }
  71% { font-size: 0.90rem; }
  85% { font-size: 0.85rem; }
`;

const FadeOut = keyframes`
  100% { opacity: 0; }
`;

export const AlertSuccessContainer = styled.div`
  text-align: left;
  font-size: 0.8rem;
  font-weight: 300;
  border-radius: 0;
  background-color: ##d4edda;
  color: #155724;
  animation-name: ${Flash}, ${FadeOut};
  animation-duration: 0.6s, 10s;
  animation-fill-mode: both, both;
  animation-timing-function: ease, ease-in;

  p {
    color: #155724;
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

export const ErrorContainer = styled.div`
  margin-top: 1rem;
`;
