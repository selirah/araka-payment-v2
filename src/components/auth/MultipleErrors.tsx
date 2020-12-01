<<<<<<< HEAD
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
=======
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
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
