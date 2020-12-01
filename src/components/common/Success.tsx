import React from 'react';
import { AlertSuccessContainer } from './Styles';
import { ErrorContainer } from '../common/Styles';

const Success: React.FC<{ message: string }> = ({ message }) => {
  return (
    <ErrorContainer>
      <AlertSuccessContainer
        className="alert alert-success"
        style={{ textAlign: 'center' }}
      >
        {message}
      </AlertSuccessContainer>
    </ErrorContainer>
  );
};

export { Success };
