import React from 'react';
import { Helmet } from 'react-helmet';
import { Help } from './Help';
import { NavLayout } from './NavLayout';
import { PageContainer } from './PageContainer';

type Props = {
  title?: string;
};

const Failure: React.FC<Props> = ({ title }) => {
  return (
    <section>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <NavLayout />
      <PageContainer>
        <div className="row justify-content-center">
          <div className="display-success-failure-cancel text-center">
            <h2>Oops ... something went wrong processing your transaction</h2>
            <h4>You can re-try or start this process over</h4>
            <h5>this has been logged in your transaction history</h5>
            <div className="display-icon">
              <i className="fas fa-times icon-failure"></i>
              <h4>Airtime top-up failed</h4>
            </div>
            <div className="display-success-failure-cancel-buttons">
              <button className="btn">View history</button>
              <button className="btn">Re-try</button>
            </div>
          </div>
        </div>
      </PageContainer>
      <Help />
    </section>
  );
};

export { Failure };
