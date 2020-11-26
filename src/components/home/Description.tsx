import React from 'react';
import { Link } from 'react-router-dom';
import { path } from '../../helpers/path';

const Description: React.FC = () => {
  return (
    <section className="bg-gray clients-section">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h4>Easy for your clients</h4>
            <h2>A fully integrated suite of payment products</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <p className="lead">
              We bring together everything that is required to make and accept
              payment and payouts globally. <span>Araka</span> powers payments
              for <span>utility providers</span>{' '}
              <span>telecommunication providers</span>, <span>merchants</span>{' '}
              and everything in between. We are equipped to assist your business
              to start transacting online by providing a set of APIs that a very
              easy to implement. Through Araka, you will <span>beat fraud</span>
              , <span>send invoices</span>; create quick{' '}
              <span>payment pages</span> and so much more!
            </p>
            <div className="btn-links">
              <Link to={path.register}>
                <button className="btn btn-bc-merchant">
                  Become a merchant
                </button>
              </Link>
              <Link to={path.payment}>
                <button className="btn">Start making payments</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Description };
