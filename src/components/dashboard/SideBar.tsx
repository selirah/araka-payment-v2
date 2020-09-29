import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../../images/Images';
import { path } from '../../helpers/path';

const SideBar: React.FC = () => {
  const href = '#';
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
          {/* <i className="fas fa-laugh-wink"></i> */}
          <img src={logo} alt="" width="40" />
        </div>
        <div className="sidebar-brand-text mx-3">ARAKA</div>
      </a>

      <hr className="sidebar-divider my-0"></hr>

      <li className="nav-item active">
        <a className="nav-link" href="index.html">
          <button className="btn btn-custom">Make Payments</button>
        </a>
      </li>

      <hr className="sidebar-divider my-0"></hr>

      <li className="nav-item active">
        <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      <hr className="sidebar-divider"></hr>

      <div className="sidebar-heading">Home</div>

      <li className="nav-item">
        <a className="nav-link" href="index.html">
          <i className="fas fa-fw fa-home"></i>
          <span>Home</span>
        </a>
      </li>

      <hr className="sidebar-divider"></hr>
      <div className="sidebar-heading">Account</div>

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
