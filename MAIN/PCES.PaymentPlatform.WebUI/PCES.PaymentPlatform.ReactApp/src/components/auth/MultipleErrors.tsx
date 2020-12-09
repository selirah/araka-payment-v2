import React from 'react';
import { AlertContainer } from './styles/Styles';
import { IError } from '../../models/IError';

const MultipleErrors: React.FC<{ error: IError }> = ({ error }) => {
  const { errors } = error;

  return (
    <AlertContainer className="alert alert-danger">
      <p>The following errors occurred:</p>
      {JSON.stringify(errors)}
    </AlertContainer>
  );
};

export { MultipleErrors };
