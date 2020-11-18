import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Link, useLocation } from 'react-router-dom';
import { logo } from '../../images/Images';
import { path } from '../../helpers/path';
import { logout } from '../../store/auth/actions';
import { secure } from '../../utils/secure';
import { user as avatar } from '../../images/Images';
import { User } from 'src/interfaces';

const Nav: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, user } = appSelector((state) => state.auth);
  const [lang, setLang] = useState<string | null>(
    localStorage.getItem('i18nextLng')
  );
  const [userDetails] = useState<User | undefined>(user);
  const [fname, setFname] = useState('');
  const { t, i18n } = useTranslation();
  const location = useLocation().pathname;

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLang(lang);
  };
  const href = '#';

  useEffect(() => {
    if (userDetails !== undefined) {
      let name: string[] | undefined;
      if (userDetails.name !== null) {
        name = userDetails.name?.split(' ');
        setFname(name[0]);
      } else {
        setFname('Test Account');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutUser = (): void => {
    secure.removeAll();
    dispatch(logout());
  };

  console.log(path.pricing);

  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-alt navbar-expand-md navbar-custom shadow">
          <div className="container">
            <Link className="navbar-brand" to={path.home}>
              <img src={logo} width="40" alt="" /> Araka
            </Link>
            <button
              className="navbar-toggler custom-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse navbar-collapse-alt"
              id="navbarResponsive"
            >
              <ul className="navbar-nav ml-auto website-navigation">
                <li className="nav-item">
                  <a
                    href="https://araka-merchant.herokuapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                  >
                    {t('nav-links.merchants')}
                  </a>
                </li>
                <li className="nav-item">
                  <Link
                    to={path.pricing}
                    className={`nav-link ${
                      location === path.pricing ? 'active' : null
                    }`}
                  >
                    {t('nav-links.pricing')}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={path.about}
                    className={`nav-link ${
                      location === path.about ? 'active' : null
                    }`}
                  >
                    {t('nav-links.about')}
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
                {!isAuthenticated ? (
                  <li className="nav-item">
                    <Link to={path.login} className="btn btn-outline-custom">
                      {t('nav-links.sign-in')}
                    </Link>
                  </li>
                ) : (
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
                      <img
                        className="thumbnail-image"
                        src={avatar}
                        alt="user pic"
                        width="42"
                      />
                      {t('nav-links.welcome')} {fname}{' '}
                    </a>
                    <div
                      className="dropdown-menu animate slideIn"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link className="dropdown-item" to={path.dashboard}>
                        <i className="fa fa-dashboard"></i>{' '}
                        {t('nav-links.dashboard')}
                      </Link>
                      <a
                        className="dropdown-item"
                        href={href}
                        onClick={() => logoutUser()}
                      >
                        <i className="fa fa-sign-out"></i>{' '}
                        {t('nav-links.logout')}
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export { Nav };
