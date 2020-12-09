import React from 'react';
import { Layout } from 'antd';
import { MinVH } from './Styles';

const LayoutContent: React.FC<{ children: any }> = ({ children }) => {
  return (
    <MinVH>
      <Layout>{children}</Layout>
    </MinVH>
  );
};

export { LayoutContent };
