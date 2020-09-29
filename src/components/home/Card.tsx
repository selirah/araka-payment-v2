import React from 'react';

const Card: React.FC = () => {
  return (
    <section className="card-section">
      <div className="container">
        <div className="row vertical-content">
          <div className="col-sm-4">
            <div className="more-features-box features-border bg-white rounded text-left p-4">
              <div className="more-features-icon">
                <i className="mbri-speed h1 mb-3 text-custom"></i>
              </div>
              <div className="creative-testi-desc pt-3">
                <h5 className="my-3">Ready to get Started</h5>
                <p className="mb-0 text-muted pb-4">
                  Explore <span>ARAKA</span>, or create an account instantly and
                  start accepting payments
                </p>
                <button className="btn btn-outline-custom-alt">
                  Start Now
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="more-features-box features-border bg-white rounded text-left p-4">
              <div className="more-features-icon">
                <i className="mbri-cust-feedback h1 mb-3 text-custom"></i>
              </div>
              <div className="creative-testi-desc pt-3">
                <h5 className="my-3">Always know what you pay</h5>
                <p className="mb-0 text-muted pb-4">
                  Integrated per transaction. No hidden fees
                </p>
                <br />
                <button className="btn btn-outline-custom-alt">
                  See Pricing
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="more-features-box features-border bg-white rounded text-left p-4">
              <div className="more-features-icon">
                <i className="mbri-timer h1 mb-3 text-custom"></i>
              </div>
              <div className="creative-testi-desc pt-3">
                <h5 className="my-3">Start your integration</h5>
                <p className="mb-0 text-muted pb-4">
                  Get up and running with <span>ARAKA</span> in as little as 10
                  minutes
                </p>
                <br />
                <button className="btn btn-outline-custom-alt">
                  API Reference
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Card };
