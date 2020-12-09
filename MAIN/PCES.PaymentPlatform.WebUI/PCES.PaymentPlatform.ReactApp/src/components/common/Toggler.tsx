import React from 'react';

const Toggler: React.FC = () => {
  return (
    <React.Fragment>
      <button
        className="navbar-toggler custom-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </React.Fragment>
  );
};

export { Toggler };
