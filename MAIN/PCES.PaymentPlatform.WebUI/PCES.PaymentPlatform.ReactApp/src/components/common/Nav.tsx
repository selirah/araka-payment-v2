import React from 'react';
import { NavbarBrand } from './NavbarBrand';
import { Toggler } from './Toggler';
import { NavLinks } from './NavLinks';

const Nav: React.FC = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-md navbar-custom fixed-top shadow">
        <div className="container-fluid page-padding">
          <NavbarBrand />
          <Toggler />
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <NavLinks />
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export { Nav };
