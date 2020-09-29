import React, { useEffect } from 'react';
import { Layout } from '../../components/dashboard/Layout';
import {
  toggleSideNav,
  resizeWindow,
  unScrollWrapper,
  scrollToTop,
  smoothScroll,
} from '../../helpers/dashboard';

const DashboardPage: React.FC = () => {
  useEffect(() => {
    toggleSideNav();
    resizeWindow();
    unScrollWrapper();
    scrollToTop();
    smoothScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Layout title="Araka | Dashboard" />;
};

export default DashboardPage;
