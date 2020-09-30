import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLayout } from './NavLayout';
import { PageContainer } from './PageContainer';

type Props = {
  title?: string;
};

const Success: React.FC<Props> = ({ title }) => {
  return (
    <section>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <NavLayout />
      <PageContainer>
        <div className="row display-success justify-content-center">
          <div className="display-success text-center">
            <h2>Awesome! Your transaction was completed successfully</h2>
            <h4>You can perform another or view your </h4>
            <h5>transaction history</h5>
            <div className="display-icon">
              <i className="fas fa-check-double"></i>
              <h4>Airtime top-up was successful</h4>
            </div>
            <div className="display-success-buttons">
              <button className="btn">View history</button>
              <button className="btn">Start new payment</button>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export { Success };
