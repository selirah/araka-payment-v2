import React from 'react';
import { Helmet } from 'react-helmet';
import { SideBar } from './SideBar';
import { TopNav } from './TopNav';
import { ContentContainer } from './ContentContainer';
import { Content } from './Content';
import './style.css';
import './dashboard.css';

type Props = {
  title: string;
};

const Layout: React.FC<Props> = ({ title }) => {
  return (
    <section id="page-top">
      <div id="wrapper">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <SideBar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopNav />
            <div className="container-fluid">
              <ContentContainer title="Dashboard">
                <Content />
              </ContentContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Layout };
