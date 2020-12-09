import React from 'react';
import { logoNav } from '../../images/Images';

const NavbarBrand: React.FC = () => {
  return (
    <React.Fragment>
      <a href="/" className="navbar-brand">
        <img src={logoNav} alt="logo" />
      </a>
    </React.Fragment>
  );
};

export { NavbarBrand };
