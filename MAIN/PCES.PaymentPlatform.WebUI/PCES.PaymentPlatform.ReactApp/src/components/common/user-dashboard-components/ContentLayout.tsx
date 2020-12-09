import React from 'react';
import { Layout } from 'antd';
import { SiteLayoutBackground, ContentAlignment } from './Styles';

const ContentLayout: React.FC<{ children: any }> = ({ children }) => {
  return (
    <SiteLayoutBackground>
      <ContentAlignment>
        <Layout.Content>{children}</Layout.Content>
      </ContentAlignment>
    </SiteLayoutBackground>
  );
};

export { ContentLayout };
