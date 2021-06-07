import styled, { keyframes } from 'styled-components';
import { Modal } from 'react-bootstrap';

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
  14% { font-size: 0.65rem; color: #155724; background: #d4edda; }
  28% { font-size: 0.65rem; color: initial; background: initial; }
  42% { font-size: 0.65rem; }
  57% { font-size: 0.65rem; }
  71% { font-size: 0.65rem; }
  85% { font-size: 0.65rem; }
`;

const FadeOut = keyframes`
  100% { opacity: 1; }
`;

export const AlertSuccessContainer = styled.div`
  text-align: left;
  font-size: 0.65rem;
  font-weight: 700;
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

export const ModalBoxLeft = styled.div`
  width: 25%;
  background: #f4f4f4;
  border-radius: 5px 0 0 5px !important;
  padding: 2rem 1rem 1.5rem 1rem;
  h4 {
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    color: rgba(66, 84, 102, 0.9);
  }

  .option {
    border-top: 1px solid #e7e7e7;
    margin-top: 1rem;
    display: flex;
    position: relative;

    h6 {
      font-size: 0.8rem;
      margin-top: 1.2rem;
      font-weight: 700;
      color: #f55c29;
      :hover {
        cursor: pointer;
      }
    }
    img {
      width: 30px;
      height: auto;
      margin-right: 2px;
    }
    .indicator {
      background: #f55c29;
      width: 0.2rem;
      height: 0.5rem;
      position: absolute;
      right: -1rem;
      top: 1.3rem;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }
`;

export const ModalBoxRight = styled(Modal.Header)`
  width: 75%;
  display: block;
  padding: 1rem;
  .header {
    padding: 0.5rem;
    border-bottom: 1px solid #e7e7e7;
    display: flex;
    justify-content: flex-end;
    h4 {
      font-size: 1rem;
      color: #9b9b9b;
      margin-right: 0.5rem;
    }
    h2 {
      font-size: 1rem;
      font-weight: 700;
    }
  }
  .body {
    margin-top: 1rem;
    text-align: center;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 2rem;
    display: block;

    img {
      vertical-align: middle;
      width: 200px;
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 1rem;
    }
    h4 {
      font-size: 0.95rem;
      color: #5a6672;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .pay-form {
      display: block;
      padding: 1.5rem;
      margin-left: auto;
      margin-right: auto;
      .phone {
        border: 1px solid #fbd5c7;
        height: 1rem;
        padding: 1.2rem 2rem 1.2rem 3rem;
        font-size: 1.2rem;
        width: 100%;
        font-weight: 400;
        color: #495057;
        line-height: 1.5;
        border-radius: 2px;
        outline: none;
      }

      .btnflag {
        border: none;
        background: transparent;
        padding: 0.2rem 0.2rem;
      }

      .dropdown-btn {
        text-align: left;
        font-size: 0.8rem;
        font-weight: 400;
      }

      .select {
        width: 100%;
        margin-top: 1rem;
        border: 1px solid #fbd5c7;
        font-weight: 400;
        color: #495057;
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;
        border-radius: 2px;
        outline: none;
      }

      .btn {
        width: 100%;
        margin-top: 1rem;
        padding: 0.5rem;
        background-color: #f55c29;
        color: #fff;
        font-size: 1rem;
        border-radius: 2px;
      }
    }
  }
`;

export const ProcessingContainer = styled.div`
  position: relative;
  padding: 1.75rem;
`;
