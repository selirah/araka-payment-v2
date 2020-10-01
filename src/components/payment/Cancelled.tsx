import React from 'react';
import { Helmet } from 'react-helmet';
import { Help } from './Help';
import { NavLayout } from './NavLayout';
import { PageContainer } from './PageContainer';

type Props = {
  title?: string;
};

const Cancelled: React.FC<Props> = ({ title }) => {
  return (
    <section>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <NavLayout />
      <PageContainer>
        <div className="row justify-content-center">
          <div className="display-success-failure-cancel text-center">
            <h2>
              ... sad to see you cancel transaction. Did something go wrong?
            </h2>
            <h4>You can re-try or start this process over</h4>

            <div className="display-icon">
              <i className="fa fa-frown-o icon-cancel"></i>
              <h4>Airtime top-up cancelled</h4>
            </div>
            <div className="display-success-failure-cancel-buttons">
              <button className="btn">Start Over</button>
              <button className="btn">Re-try</button>
            </div>
          </div>
        </div>
      </PageContainer>
      <Help />
    </section>
  );
};

export { Cancelled };
