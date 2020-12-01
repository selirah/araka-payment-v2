<<<<<<< HEAD
import React from 'react';
import { AlertContainer } from './Styles';

const SingleError: React.FC<{ error: any }> = ({ error }) => {
  return (
    <AlertContainer className="alert alert-danger">
      {error.error !== undefined ? error.error : error}
    </AlertContainer>
  );
};

export { SingleError };
=======
import React from 'react';
import { AlertContainer } from './Styles';

const SingleError: React.FC<{ error: any }> = ({ error }) => {
  return (
    <AlertContainer className="alert alert-danger">
      {error.error !== undefined ? error.error : error}
    </AlertContainer>
  );
};

export { SingleError };
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
