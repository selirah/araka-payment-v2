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
{/* 
        <li className="nav-item dropdown no-arrow mx-1">
          <a
            className="nav-link dropdown-toggle"
            href={href}
            id="alertsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-bell fa-fw"></i>
             <span className="badge badge-danger badge-counter">3+</span> 
          </a>
          <div
            className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="alertsDropdown"
          >
            <h6 className="dropdown-header">Alerts Center</h6>
            <a className="dropdown-item d-flex align-items-center" href={href}>
              <div className="mr-3">
                <div className="icon-circle bg-primary">
                  <i className="fas fa-file-alt text-white"></i>
                </div>
              </div>
              <div>
                <div className="small text-gray-500">December 12, 2019</div>
                <span className="font-weight-bold">
                  A new monthly report is ready to download!
                </span>
              </div>
            </a>
            <a className="dropdown-item d-flex align-items-center" href={href}>
              <div className="mr-3">
                <div className="icon-circle bg-success">
                  <i className="fas fa-donate text-white"></i>
                </div>
              </div>
              <div>
                <div className="small text-gray-500">December 7, 2019</div>
                $290.29 has been deposited into your account!
              </div>
            </a>
            <a className="dropdown-item d-flex align-items-center" href={href}>
              <div className="mr-3">
                <div className="icon-circle bg-warning">
                  <i className="fas fa-exclamation-triangle text-white"></i>
                </div>
              </div>
              <div>
                <div className="small text-gray-500">December 2, 2019</div>
                Spending Alert: We've noticed unusually high spending for your
                account.
              </div>
            </a>
            <a
              className="dropdown-item text-center small text-gray-500"
              href={href}
            >
              Show All Alerts
            </a>
          </div>
        </li>

        <li className="nav-item dropdown no-arrow mx-1">
          <a
            className="nav-link dropdown-toggle"
            href={href}
            id="messagesDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-question-circle fa-fw"></i>
            <span className="badge badge-danger badge-counter"></span>
          </a>
          <div
            className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="messagesDropdown"
          >
            <h6 className="dropdown-header">Message Center</h6>
            <a className="dropdown-item d-flex align-items-center" href={href}>
              <div className="dropdown-list-image mr-3">
                <img
                  className="rounded-circle"
                  src="https://source.unsplash.com/fn_BT9fwg_E/60x60"
                  alt=""
                />
                <div className="status-indicator bg-success"></div>
              </div>
              <div className="font-weight-bold">
                <div className="text-truncate">
                  Hi there! I am wondering if you can help me with a problem
                  I've been having.
                </div>
                <div className="small text-gray-500">Emily Fowler · 58m</div>
              </div>
            </a>
            <a className="dropdown-item d-flex align-items-center" href={href}>
              <div className="dropdown-list-image mr-3">
                <img
                  className="rounded-circle"
                  src="https://source.unsplash.com/AU4VPcFN4LE/60x60"
                  alt=""
                />
                <div className="status-indicator"></div>
              </div>
              <div>
                <div className="text-truncate">
                  I have the photos that you ordered last month, how would you
                  like them sent to you?
                </div>
                <div className="small text-gray-500">Jae Chun · 1d</div>
              </div>
            </a>
            <a className="dropdown-item d-flex align-items-center" href={href}>
              <div className="dropdown-list-image mr-3">
                <img
                  className="rounded-circle"
                  src="https://source.unsplash.com/CS2uCrpNzJY/60x60"
                  alt=""
                />
                <div className="status-indicator bg-warning"></div>
              </div>
              <div>
                <div className="text-truncate">
                  Last month's report looks great, I am very happy with the
                  progress so far, keep up the good work!
                </div>
                <div className="small text-gray-500">Morgan Alvarez · 2d</div>
              </div>
            </a>
            <a className="dropdown-item d-flex align-items-center" href={href}>
              <div className="dropdown-list-image mr-3">
                <img
                  className="rounded-circle"
                  src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                  alt=""
                />
                <div className="status-indicator bg-success"></div>
              </div>
              <div>
                <div className="text-truncate">
                  Am I a good boy? The reason I ask is because someone told me
                  that people say this to all dogs, even if they aren't good...
                </div>
                <div className="small text-gray-500">Chicken the Dog · 2w</div>
              </div>
            </a>
            <a
              className="dropdown-item text-center small text-gray-500"
              href={href}
            >
              Read More Messages
            </a>
          </div>
        </li> */}
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
