import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../../images/Images';
import { path } from '../../helpers/path';

const SideBar: React.FC = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-custom sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <img src={logo} alt="" width="40" />
        </div>
        <div className="sidebar-brand-text mx-3">ARAKA</div>
      </a>

      <hr className="sidebar-divider my-0"></hr>

      {/* <li className="nav-item active">
        <Link className="nav-link btn-custom" to={path.payment}>
          <span>Make Payments</span>
        </Link>
      </li> */}

      <hr className="sidebar-divider my-0"></hr>

      <li className="nav-item active">
        <Link className="nav-link" to={path.home}>
          <i className="fas fa-fw fa-home"></i>
          <span>Home</span>
        </Link>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="charts.html">
          <i className="fas fa-fw fa-briefcase"></i>
          <span>Account</span>
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="tables.html">
          <i className="fas fa-fw fa-users"></i>
          <span>Recipients</span>
        </a>
      </li>

      <hr className="sidebar-divider d-none d-md-block"></hr>

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
};

export { SideBar };
