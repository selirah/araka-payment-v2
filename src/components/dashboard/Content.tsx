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
                ></Link>
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
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                </div>
              </div>
            </div>
            <hr />
            <div className="card">
              <div className="card-header" id="headingOne">
                <Link
                  to={href}
                  className="btn-header-link"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                ></Link>
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
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
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
