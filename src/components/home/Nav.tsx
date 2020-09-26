import React from 'react';
// import { i18n, useTranslation } from '../../i18n';
import { Link } from 'react-router-dom';
import { path } from '../../helpers/path';

const Nav: React.FC = () => {
  // const { t } = useTranslation();

  // const changeLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };
  const href = '#';

  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-custom shadow">
          <div className="container">
            <Link className="navbar-brand" to={path.home}>
              <img src="/img/araka/logo_symbol.png" width="40" alt="" /> Araka
            </Link>
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
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    Merchants
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    Pricing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link"></Link>
                </li>
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
                    <a
                      className="dropdown-item"
                      href={href}
                      // onClick={() => changeLanguage('en')}
                    >
                      <i className="flag-icon flag-icon-gb"></i> English
                    </a>
                    <a
                      className="dropdown-item"
                      href={href}
                      // onClick={() => changeLanguage('fr')}
                    >
                      <i className="flag-icon flag-icon-fr"></i> Français
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <Link to="#" className="btn btn-outline-custom">
                    Sign in
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export { Nav };
