import React, { createElement } from 'react';
import { Layout, Affix, Menu, Dropdown, Button } from 'antd';
import * as Icons from '@ant-design/icons';
import {
  SiteLayoutBackground,
  Trigger,
  PortalTitle,
  FloatRight,
} from './Styles';
import { StarterMenu } from './StarterMenu';
import { TestMenu } from './TestMenu';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';

const TopMenu: React.FC<{ collapsed: boolean; toggle(): void }> = ({
  collapsed,
  toggle,
}) => {
  return (
    <SiteLayoutBackground>
      <Affix>
        <Layout>
          <Layout.Header>
            {createElement(
              collapsed ? Icons.MenuUnfoldOutlined : Icons.MenuFoldOutlined,
              <Trigger onClick={toggle} />
            )}
            <PortalTitle>Dashboard</PortalTitle>
            <FloatRight>
              <Menu mode="horizontal">
                <Menu.Item key="1">
                  <Dropdown overlay={<StarterMenu />}>
                    <Button danger>
                      Starter Business <Icons.DownOutlined />
                    </Button>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item key="2">
                  <Dropdown overlay={<TestMenu />}>
                    <Button danger>
                      Test Mode <Icons.DownOutlined />
                    </Button>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item key="3">
                  <Dropdown overlay={<NotificationsMenu />}>
                    <Icons.BellOutlined />
                  </Dropdown>
                </Menu.Item>
                <Menu.Item key="4">
                  <Dropdown overlay={<UserMenu />}>
                    <Icons.UserOutlined />
                  </Dropdown>
                </Menu.Item>
              </Menu>
            </FloatRight>
          </Layout.Header>
        </Layout>
      </Affix>
    </SiteLayoutBackground>
  );
};

export { TopMenu };
