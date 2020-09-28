import styled from 'styled-components';

export const SpinnerContainer = styled.div`
  color: #fbbd19;
`;
export const SmallIcon = styled.i`
  font-size: 1rem;
`;
export const LanguageContainer = styled.div`
  padding-left: 0;
`;

export const DropdownToggle = styled.a`
  color: #506077;
  font-weight: 700;
  :hover {
    color: #f4744b;
    font-weight: 700;
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

export const ErrorContainer = styled.div`
  margin-top: 1rem;
`;
