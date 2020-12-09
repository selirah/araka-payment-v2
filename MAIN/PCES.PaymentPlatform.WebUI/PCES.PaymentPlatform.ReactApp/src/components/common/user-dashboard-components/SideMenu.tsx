import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import * as Icons from '@ant-design/icons';
import { Logo } from './Styles';

const SideMenu: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <Logo />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
        <Menu.Item key="1" icon={<Icons.GlobalOutlined />}>
          <Link to="/dashboard/getstarted">Get Started</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<Icons.HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.ItemGroup key="g1" title="PAYMENTS">
          <Menu.Item key="3" icon={<Icons.CreditCardOutlined />}>
            <Link to="/dashboard/transactions">Transactions</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<Icons.UsergroupAddOutlined />}>
            Customers
          </Menu.Item>
          <Menu.Item key="5" icon={<Icons.DownloadOutlined />}>
            Payouts
          </Menu.Item>
          <Menu.Item key="6" icon={<Icons.FlagOutlined />}>
            Disputes
          </Menu.Item>
          <Menu.Item key="7" icon={<Icons.BookOutlined />}>
            Subscriptions
          </Menu.Item>
          <Menu.Item key="8" icon={<Icons.TagsOutlined />}>
            Plans
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Layout.Sider>
  );
};

export { SideMenu };
