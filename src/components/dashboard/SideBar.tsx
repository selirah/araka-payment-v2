import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { logo } from '../../images/Images';
import { path } from '../../helpers/path';
import { pageTypes } from '../../helpers/constants';
import { setPageSwitch } from '../../store/dashboard';

const SideBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { pageSwitch } = appSelector((state) => state.dashboard);
  const [page, setPage] = useState<string>(pageSwitch);

  const swtichPage = (page: string): void => {
    dispatch(setPageSwitch(page));
  };

  useEffect(() => {
    setPage(pageSwitch);
  }, [pageSwitch]);

  return (
    <ul
      className="navbar-nav bg-gradient-custom sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Link
        to={path.home}
        className="sidebar-brand d-flex align-items-center justify-content-center"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <img src={logo} alt="" width="40" />
        </div>
        <div className="sidebar-brand-text mx-3">ARAKA</div>
      </Link>

      <hr className="sidebar-divider my-0"></hr>

      <li className="nav-item">
        <Link className="nav-link btn-custom" to={path.payment}>
          <span>Make Payments</span>
        </Link>
      </li>

      <hr className="sidebar-divider my-0"></hr>

      <li className={`nav-item ${page === pageTypes.HOME ? 'active' : null}`}>
        <Link
          className="nav-link"
          to="#"
          onClick={() => swtichPage(pageTypes.HOME)}
        >
          <i className="fas fa-fw fa-home"></i>
          <span>Home</span>
        </Link>
      </li>

      <li
        className={`nav-item ${page === pageTypes.ACCOUNT ? 'active' : null}`}
      >
        <Link
          className="nav-link"
          to="#"
          onClick={() => swtichPage(pageTypes.ACCOUNT)}
        >
          <i className="fas fa-fw fa-briefcase"></i>
          <span>Account</span>
        </Link>
      </li>

      <li
        className={`nav-item ${
          page === pageTypes.RECIPIENTS ? 'active' : null
        }`}
      >
        <Link
          className="nav-link"
          to="#"
          onClick={() => swtichPage(pageTypes.RECIPIENTS)}
        >
          <i className="fas fa-fw fa-users"></i>
          <span>Recipients</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block"></hr>

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
};

export { SideBar };
