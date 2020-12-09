import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../helpers/appDispatch';
import { logout } from '../../store/auth/actions';
import secure from 'secure-ls';

const ls = new secure({ encodingType: 'aes', isCompression: false });

const NavLinks: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [lang, setLang] = useState<string | null>(
    localStorage.getItem('i18nextLng')
  );
  const { t, i18n } = useTranslation();
  const href = '#';

  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
    setLang(lang);
  };

  const logoutUser = (): void => {
    ls.removeAll();
    ls.clear();
    dispatch(logout());
  };

  return (
    <React.Fragment>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="/"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {t('nav_links.top_up')}
          </a>
          <div
            className="dropdown-menu animate slideIn"
            aria-labelledby="navbarDropdown"
          >
            <a className="dropdown-item" href="/">
              One Method
            </a>
            <a className="dropdown-item" href="/">
              Another Method
            </a>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="/"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {t('nav_links.pay_bills')}
          </a>
          <div
            className="dropdown-menu animate slideIn"
            aria-labelledby="navbarDropdown"
          >
            <a className="dropdown-item" href="/">
              One Method
            </a>
            <a className="dropdown-item" href="/">
              Another Method
            </a>
          </div>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">
            {t('nav_links.faqs')}
          </a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">
            {t('nav_links.how_it_works')}
          </a>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="/"
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
              {t('nav_links.english')}
            </a>
            <a
              className="dropdown-item"
              href={href}
              onClick={() => changeLanguage('fr')}
            >
              <i className="flag-icon flag-icon-fr"></i> {t('nav_links.french')}
            </a>
          </div>
        </li>
        {/* <li className="nav-item">
          <Link to="/auth/register" className="btn btn-custom">
            {t('nav_links.signup')}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/auth/login" className="btn btn-outline-custom">
            {t('nav_links.login')}
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            {t('dashboard.dashboard')}
          </Link>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-outline-custom"
            onClick={() => logoutUser()}
          >
            {t('dashboard.logout')}
          </button>
        </li>
      </ul>
    </React.Fragment>
  );
};

export { NavLinks };
