import React from 'react';
import { Link } from 'react-router-dom';

const Content: React.FC = () => {
  const href = '#';
  return (
    <div className="row">
      <div className="col-12">
        <div className="top-pane">
          <h2>Activity</h2>
          <form>
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn" type="submit">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="middle-pane">
          <h2>September 17</h2>
        </div>
        <div className="transaction-content">
          <div className="accordion" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <Link
                  to={href}
                  className="btn-header-link"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <div className="amount">
                    <h2>USD 20.00</h2>
                  </div>
                </Link>
                <img src={'https://via.placeholder.com/50'} alt="logo" />
                <div className="card-header-content">
                  <h2>Airtime top-up</h2>
                  <h4>Airtime for cousin Carlos</h4>
                  <div className="bottom-time">
                    <h6>6:15 PM</h6>
                    <h6>
                      <button>orange</button>
                    </h6>
                    <h6>
                      <button>card payment</button>
                    </h6>
                  </div>
                </div>
              </div>
              <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  <div className="transaction-details">
                    <h2>Transaction Details</h2>

                    <div className="receipt">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td>You sent</td>
                            <td>USD 20.00</td>
                          </tr>
                          <tr>
                            <td>To</td>
                            <td>0293489239879</td>
                          </tr>
                          <tr>
                            <td>Our Fee</td>
                            <td>USD 0.00</td>
                          </tr>
                          <tr>
                            <td>Transaction ID</td>
                            <td>#5392382983277</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="receipt-buttons">
                      <button className="btn">Download Receipt</button>
                      <button className="btn">Repeat this transaction</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <hr /> */}
            <div className="card">
              <div className="card-header" id="headingOne">
                <Link
                  to={href}
                  className="btn-header-link"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseTwo"
                >
                  <div className="amount">
                    <h2>USD 10,000.00</h2>
                  </div>
                </Link>
                <img src={'https://via.placeholder.com/50'} alt="logo" />
                <div className="card-header-content">
                  <h2>School Fees Payment</h2>
                  <h4>Kinshasa University 2nd semester payment</h4>
                  <div className="bottom-time">
                    <h6>10:15 AM</h6>
                    <h6>
                      <button>Kinshasa University</button>
                    </h6>
                    <h6>
                      <button>card payment</button>
                    </h6>
                  </div>
                </div>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  <div className="transaction-details">
                    <h2>Transaction Details</h2>

                    <div className="receipt">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td>You sent</td>
                            <td>USD 10,000.00</td>
                          </tr>
                          <tr>
                            <td>To</td>
                            <td>Kinshasa University</td>
                          </tr>
                          <tr>
                            <td>Our Fee</td>
                            <td>USD 0.00</td>
                          </tr>
                          <tr>
                            <td>Transaction ID</td>
                            <td>#5392382983277</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="receipt-buttons">
                      <button className="btn">Download Receipt</button>
                      <button className="btn">Repeat this transaction</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Content };
