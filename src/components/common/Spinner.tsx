import React from 'react';
import { SpinnerContainer } from './Styles';

const Spinner: React.FC = () => (
  <React.Fragment>
    <div className="d-flex justify-content-center mt-4">
      <SpinnerContainer className="fa fa-spinner fa-spin fa-3x fa-fw">
        <span className="sr-only">Loading...</span>
      </SpinnerContainer>
    </div>
  </React.Fragment>
);

export { Spinner };
