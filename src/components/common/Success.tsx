<<<<<<< HEAD
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
=======
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
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
