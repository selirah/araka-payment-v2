import styled from 'styled-components';

export const MPESAPaymentContainer = styled.div`
  border: 0.0625rem solid #e0e0e0;
  padding: 1.75rem;
  margin-top: 200px;
  position: relative;
  background: #fff;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.3rem;
    font-weight: 700;
    color: #506077;
    text-align: left;
  }

  p {
    font-size: 1rem;
    text-align: left;
    line-height: 1.5rem;
    font-weight: 300;
  }

  .btn-container {
    padding: 10px 0 0 0;
    text-align: right;

    button {
      margin: 5px;
    }

    .cancel-btn {
      background: #949dac;
      color: #fff;
      transition: all 0.3s ease-in-out;
      border-radius: 5px;
      font-weight: 300;
      padding: 0.46rem 1.33rem 0.46rem 1.2rem;
      border: none;
      font-size: 18px;
    }
    .cancel-btn:hover {
      background: #8b9bb5;
    }

    .success-btn {
      font-size: 18px;
      padding: 0.46rem 1.33rem 0.46rem 1.2rem;
      border: none;
      font-weight: 300;
      border-radius: 5px;
      background: #f55c29;
      color: #fff;
      transition: all 0.3s ease-in-out;
    }

    .success-btn:hover {
      background: #e3653b;
    }
  }
`;

export const FormBoxInput = styled.div`
  position: relative;
  margin-bottom: 15px;

  .form-control-mpesa {
    padding: 0.8rem !important;
  }
`;

export const ImageBox = styled.div`
  margin-top: 3rem;

  img {
    max-width: 18rem;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }
`;
