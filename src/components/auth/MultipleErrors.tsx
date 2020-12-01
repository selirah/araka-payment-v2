import React from 'react';
import { AlertContainer } from './Styles';
import { Error } from '../../interfaces';

const MultipleErrors: React.FC<{ error: Error }> = ({ error }) => {
  const { errors } = error;

  return (
    <AlertContainer className="alert alert-danger">
      <p>The following errors occurred:</p>
      {JSON.stringify(errors)}
    </AlertContainer>
  );
};

export { MultipleErrors };
