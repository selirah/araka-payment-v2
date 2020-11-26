import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  HomeOutlined,
  BankOutlined,
  TeamOutlined,
  CreditCardFilled,
} from '@ant-design/icons';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { logo } from '../../images/Images';
import { path } from '../../helpers/path';
import { pageTypes } from '../../helpers/constants';
import {
  setPageSwitch,
  setTopBarHeader,
  setEditAccount,
} from '../../store/dashboard';

const SideBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { pageSwitch } = appSelector((state) => state.dashboard);
  const [page, setPage] = useState<string>(pageSwitch);
  const { t } = useTranslation();

  const swtichPage = (page: string): void => {
    if (page === pageTypes.ACCOUNT) {
      dispatch(setEditAccount(false));
    }
    dispatch(setPageSwitch(page));
    dispatch(setTopBarHeader(page));
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

      <Link className="action-btn-custom" to={path.payment}>
        <CreditCardFilled className="mr-2" />
        <span>{t('dashboard.side-bar.make-payments')}</span>
      </Link>

      <hr className="sidebar-divider my-0"></hr>

      <li className={`nav-item ${page === pageTypes.HOME ? 'active' : null}`}>
        <Link
          className="nav-link"
          to="#"
          onClick={() => swtichPage(pageTypes.HOME)}
        >
          <HomeOutlined />
          <span>{t('dashboard.side-bar.home')}</span>
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
          <BankOutlined />
          <span>{t('dashboard.side-bar.account')}</span>
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
          <TeamOutlined />
          <span>{t('dashboard.side-bar.recipients')}</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block"></hr>

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle" id="sidebarToggle"></button>
      </div>
    </ul>
  );
};

export { SideBar };
