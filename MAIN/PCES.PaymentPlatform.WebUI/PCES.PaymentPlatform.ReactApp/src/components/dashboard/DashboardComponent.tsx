import React, { useState } from 'react';
import {
  LayoutContent,
  TopMenu,
  SideMenu,
  ContentLayout,
  GraphMenu,
} from '../common/user-dashboard-components';

const DashboardComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggle = (): void => {
    setCollapsed(!collapsed);
  };

  return (
    <LayoutContent>
      <SideMenu collapsed={collapsed} />
      <TopMenu collapsed={collapsed} toggle={toggle} />
      <ContentLayout>
        <GraphMenu />
      </ContentLayout>
    </LayoutContent>
  );
};

export { DashboardComponent };
