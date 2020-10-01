import styled from 'styled-components';

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

export const ErrorContainer = styled.div`
  margin-top: 1rem;
`;
