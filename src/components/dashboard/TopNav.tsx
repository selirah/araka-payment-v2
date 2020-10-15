import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { User } from 'src/interfaces';
import { logout } from '../../store/auth/actions';
import { secure } from '../../utils/secure';
import { user as avatar } from '../../images/Images';
import { pageTypes } from '../../helpers/constants';

const TopNav: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = appSelector((state) => state.auth);
  const { topBarHeader } = appSelector((state) => state.dashboard);
  const [userDetails] = useState<User | undefined>(user);
  const [header, setHeader] = useState<string>(topBarHeader);
  const { t, i18n } = useTranslation();
  const href = '#';

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const logoutUser = (): void => {
    secure.removeAll();
    dispatch(logout());
  };

  useEffect(() => {
    setHeader(topBarHeader);
  }, [topBarHeader]);

  let icon: string;
  switch (header) {
    case pageTypes.HOME:
      icon = 'fa-home';
      break;
    case pageTypes.ACCOUNT:
      icon = 'fa-briefcase';
      break;
    case pageTypes.RECIPIENTS:
      icon = 'fa-users';
      break;
    default:
      icon = 'fa-home';
      break;
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top mx-4">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>

      <div className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100">
        <h6 className="header">
          {' '}
          <i className={`fa ${icon}`}></i>{' '}
          {t(`dashboard.top-nav.${header.toLowerCase()}`)}
        </h6>
      </div>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item lang-item p-0 mx-1 active">
          <a className="nav-link" href={href} role="button">
            <i
              className="flag-icon flag-icon-gb"
              onClick={() => changeLanguage('en')}
            ></i>
          </a>
        </li>

        <li className="nav-item lang-item p-0 mx-1">
          <a className="nav-link" href={href} role="button">
            <i
              className="flag-icon flag-icon-fr"
              onClick={() => changeLanguage('fr')}
            ></i>
          </a>
        </li>

        <div className="topbar-divider d-none d-sm-block"></div>
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href={href}
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {userDetails !== null || userDetails !== undefined
                ? userDetails!.name
                : null}
            </span>
            <img className="img-profile rounded-circle" src={avatar} alt="" />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <a
              className="dropdown-item"
              href={href}
              data-toggle="modal"
              data-target="#logoutModal"
              onClick={() => logoutUser()}
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              {t('dashboard.top-nav.logout')}
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export { TopNav };
