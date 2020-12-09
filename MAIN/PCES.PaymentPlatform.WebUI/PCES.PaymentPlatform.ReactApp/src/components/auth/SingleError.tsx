import React from 'react';
import { AlertContainer } from './styles/Styles';

const SingleError: React.FC<{ error: any }> = ({ error }) => {
  return (
    <AlertContainer className="alert alert-danger">
      {error.error}
    </AlertContainer>
  );
};

export { SingleError };
