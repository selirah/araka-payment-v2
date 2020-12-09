import React from 'react';
import { Menu } from 'antd';
import * as Icons from '@ant-design/icons';

const NotificationsMenu: React.FC = () => {
  return (
    <Menu>
      <Menu.Item key="1" icon={<Icons.PieChartOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<Icons.PieChartOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<Icons.PieChartOutlined />}>
        3rd item
      </Menu.Item>
    </Menu>
  );
};

export { NotificationsMenu };
