import React from 'react';
import { Link } from 'react-router-dom';
import { path } from '../../helpers/path';

const Description: React.FC = () => {
  return (
    <section className="bg-gray clients-section">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h4>Easy for your clients</h4>
            <h2>A fully integrated suite of payment products</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <p className="lead">
              We bring together everything that is required to make and accept
              payments and send payouts globally. <span>Araka</span> powers
              payments for <span>utility providers</span> &bull;{' '}
              <span>telecommunication providers</span> &bull;{' '}
              <span>private merchants</span> and everything in between,
            </p>
            <div className="btn-links">
              <Link to={path.register}>
                <button className="btn btn-bc-merchant">Become a merchant</button>
              </Link>
              <Link to={path.payment}>
                <button className="btn">Start making payments</button>
              </Link>
            </div>
          </div>
          <div className="col-sm-6">
            <p className="lead">
              We are equipped to assist you begin transacting your business
              online. We help merchants &bull; <span>beat fraud</span> &bull;{' '}
              <span>send invoices</span> &bull; create quick{' '}
              <span>payment pages</span> and som much more!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Description };
