import React from 'react';
import { AlertContainer } from './Styles';
import { ErrorContainer } from '../common/Styles';

const Error: React.FC<{ error: string }> = ({ error }) => {
  return (
    <ErrorContainer>
      <AlertContainer
        className="alert alert-danger"
        style={{ textAlign: 'center' }}
      >
        {error}
      </AlertContainer>
    </ErrorContainer>
  );
};

export { Error };
