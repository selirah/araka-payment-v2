import React from 'react';
import { AlertContainer, ErrorContainer } from './Styles';

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
