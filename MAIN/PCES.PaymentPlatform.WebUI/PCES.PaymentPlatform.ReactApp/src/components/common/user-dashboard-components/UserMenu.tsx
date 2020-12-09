import React from 'react';
import { Menu } from 'antd';
import * as Icons from '@ant-design/icons';

const UserMenu: React.FC = () => {
  return (
    <Menu>
      <Menu.Item key="1" icon={<Icons.UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<Icons.SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="3" icon={<Icons.LogoutOutlined />}>
        Log Out
      </Menu.Item>
    </Menu>
  );
};

export { UserMenu };
