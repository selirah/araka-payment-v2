import React from 'react';
import { Link } from 'react-router-dom';
import { appSelector } from '../../helpers/appSelector';
import { ProcessWizard } from './ProcessWizard';
import { path } from '../../helpers/path';
import { logo } from '../../images/Images';

const NavLayout: React.FC = () => {
  const { isAuthenticated } = appSelector((state) => state.auth);
  const href = '#';
  return (
    <header>
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-md navbar-custom shadow">
          {/* Direct to dashboard when its fixed */}
          <Link
            className="navbar-brand"
            to={isAuthenticated ? path.home : path.home}
          >
            <img src={logo} width="40" alt="" /> Araka
          </Link>
          <ProcessWizard />
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href={href}
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="flag-icon flag-icon-gb"></i>
                </a>
                <div
                  className="dropdown-menu animate slideIn"
                  aria-labelledby="navbarDropdown"
                >
                  <a className="dropdown-item" href={href}>
                    <i className="flag-icon flag-icon-gb"></i> English
                  </a>
                  <a className="dropdown-item" href={href}>
                    <i className="flag-icon flag-icon-fr"></i> Français
                  </a>
                </div>
              </li>
              <li>
                {/* Direct to dashboard when its fixed */}
                <Link
                  to={isAuthenticated ? path.home : path.home}
                  className="close-icon"
                >
                  <i className="mbri-close"></i>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export { NavLayout };
