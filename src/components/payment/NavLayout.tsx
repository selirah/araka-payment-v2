<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { appSelector } from '../../helpers/appSelector';
import { path } from '../../helpers/path';
import { logo } from '../../images/Images';

type Props = {
  children?: React.ReactNode;
};

const NavLayout: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = appSelector((state) => state.auth);
  const [lang, setLang] = useState<string | null>(
    localStorage.getItem('i18nextLng')
  );
  const { t, i18n } = useTranslation();
  const href = '#';

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLang(lang);
  };

  return (
    <header>
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-md navbar-custom shadow mx-4">
          <Link className="navbar-brand" to={path.home}>
            <img src={logo} width="40" alt="" /> ARAKA
          </Link>
          {children}
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
                  {lang === 'en' ? (
                    <i className="flag-icon flag-icon-gb"></i>
                  ) : (
                    <i className="flag-icon flag-icon-fr"></i>
                  )}
                </a>
                <div
                  className="dropdown-menu animate slideIn"
                  aria-labelledby="navbarDropdown"
                >
                  <a
                    className="dropdown-item"
                    href={href}
                    onClick={() => changeLanguage('en')}
                  >
                    <i className="flag-icon flag-icon-gb"></i>{' '}
                    {t('nav-links.english')}
                  </a>
                  <a
                    className="dropdown-item"
                    href={href}
                    onClick={() => changeLanguage('fr')}
                  >
                    <i className="flag-icon flag-icon-fr"></i>{' '}
                    {t('nav-links.french')}
                  </a>
                </div>
              </li>
              <li>
                {/* Direct to dashboard when its fixed */}
                <Link
                  to={isAuthenticated ? path.dashboard : path.home}
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
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { appSelector } from '../../helpers/appSelector';
import { path } from '../../helpers/path';
import { logo } from '../../images/Images';

type Props = {
  children?: React.ReactNode;
};

const NavLayout: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = appSelector((state) => state.auth);
  const [lang, setLang] = useState<string | null>(
    localStorage.getItem('i18nextLng')
  );
  const { t, i18n } = useTranslation();
  const href = '#';

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLang(lang);
  };

  return (
    <header>
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-md navbar-custom shadow mx-4">
          <Link className="navbar-brand" to={path.home}>
            <img src={logo} width="40" alt="" /> ARAKA
          </Link>
          {children}
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
                  {lang === 'en' ? (
                    <i className="flag-icon flag-icon-gb"></i>
                  ) : (
                    <i className="flag-icon flag-icon-fr"></i>
                  )}
                </a>
                <div
                  className="dropdown-menu animate slideIn"
                  aria-labelledby="navbarDropdown"
                >
                  <a
                    className="dropdown-item"
                    href={href}
                    onClick={() => changeLanguage('en')}
                  >
                    <i className="flag-icon flag-icon-gb"></i>{' '}
                    {t('nav-links.english')}
                  </a>
                  <a
                    className="dropdown-item"
                    href={href}
                    onClick={() => changeLanguage('fr')}
                  >
                    <i className="flag-icon flag-icon-fr"></i>{' '}
                    {t('nav-links.french')}
                  </a>
                </div>
              </li>
              <li>
                {/* Direct to dashboard when its fixed */}
                <Link
                  to={isAuthenticated ? path.dashboard : path.home}
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
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
