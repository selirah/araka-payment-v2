<<<<<<< HEAD
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
=======
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
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
