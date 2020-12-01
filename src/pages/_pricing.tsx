<<<<<<< HEAD
import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Nav } from '../components/home/Nav';
import { Footer } from '../components/home/Footer';
import { path } from '../helpers/path';
import { checkedIcon } from '../images/Images';

interface PricingProps {}

const PricingPage: React.FC<PricingProps> = () => {
  const [amount, setAmount] = useState('');
  const [settle, setSettle] = useState(0);
  const [fee, setFee] = useState(0);
  const percent = 0.03;

  const onChange = (e: React.FormEvent<EventTarget>): void => {
    const { value } = e.target as HTMLTextAreaElement;
    if (value === '') {
      setSettle(0);
      setFee(0);
      setAmount('');
    } else {
      setAmount(value);
      const f = percent * parseFloat(value);
      const s = parseFloat(value) - f;
      setSettle(s);
      setFee(f);
    }
  };

  return (
    <section
      className="home-page"
      data-spy="scroll"
      data-target="#navbarResponsive"
    >
      <Helmet>
        <title>Araka | Pricing</title>
      </Helmet>
      <Nav />
      <section className="card-section">
        <div className="container">
          <div className="row vertical-content">
            <div className="pricing-intro">
              <h2>Pricing built for businesses of all sizes</h2>
              <h4>Always know what you will pay.</h4>
            </div>
            <div className="col-12">
              <div id="generic_price_table">
                <section>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="generic_content clearfix">
                          <div className="generic_head_price clearfix">
                            <div className="generic_head_content clearfix">
                              <div className="head_bg"></div>
                              <div className="head">
                                <span>Araka Users</span>
                              </div>
                            </div>
                            <div
                              className="generic_price_tag clearfix"
                              style={{ margin: '50px' }}
                            >
                              <span className="price">
                                <span className="currency">3%</span>
                                <p>on all debit/credit card payments</p>
                              </span>
                            </div>
                          </div>

                          <div className="generic_feature_list">
                            <ul>
                              <li>
                                <span>2%</span> on all mobile money payments
                              </li>
                              <li>
                                <span>1%</span> on all EFT payments
                              </li>
                            </ul>
                          </div>
                          <div className="generic_price_btn clearfix">
                            <Link className="" to={path.payment}>
                              Get started in minutes
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="generic_content active clearfix">
                          <div className="generic_head_price clearfix">
                            <div className="generic_head_content clearfix">
                              <div className="head_bg"></div>
                              <div className="head">
                                <span>Araka Merchants</span>
                              </div>
                            </div>

                            <div
                              className="generic_price_tag clearfix"
                              style={{ margin: '50px' }}
                            >
                              <span className="price">
                                <span className="currency">3%</span>
                                <p>on all debit/credit card payments</p>
                              </span>
                            </div>
                          </div>

                          <div className="generic_feature_list">
                            <ul>
                              <li>
                                <span>2%</span> on all mobile money payments
                              </li>
                              <li>
                                <span>1%</span> on all EFT payments
                              </li>
                            </ul>
                          </div>
                          <div className="generic_price_btn clearfix">
                            <Link
                              className=""
                              to=""
                              style={{ visibility: 'hidden' }}
                            >
                              Access merchant account
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div id="generic_price_table">
                <section>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="clearfix">
                          <div className="math-instruction">
                            <h2>Do the math</h2>
                            <p>
                              See how much it costs to use ARAKA. Enter an
                              amount into the calculator to see our charges
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="generic_content active clearfix">
                          <div
                            className="generic_head_price clearfix"
                            style={{
                              background: '#f55c29',
                            }}
                          >
                            <div className="generic_head_content clearfix">
                              <div className="head">
                                <span
                                  style={{
                                    color: '#fff',
                                    fontSize: '2rem',
                                    fontWeight: 300,
                                  }}
                                >
                                  If your customer pays
                                </span>
                              </div>
                            </div>

                            <div className="generic_price_tag clearfix">
                              <input
                                name="amount"
                                className="form-control"
                                type="number"
                                placeholder="USD"
                                value={amount}
                                onChange={onChange}
                                min={0}
                              />
                            </div>
                          </div>
                          <div className="result-holder">
                            <div className="settle">
                              <h2>We'll settle you</h2>
                              <h4>USD {settle.toFixed(2)}</h4>
                            </div>
                            <div className="araka-fees">
                              <h2>ARAKA Fees</h2>
                              <h4>USD {fee.toFixed(2)}</h4>
                            </div>
                          </div>

                          <div className="generic_feature_list-a">
                            <ul>
                              <li>
                                Free, automatic settlement within 48 hours{' '}
                                <img src={checkedIcon} alt="check" width="20" />
                              </li>
                              <li>
                                No hidden fees or charges{' '}
                                <img src={checkedIcon} alt="check" width="20" />
                              </li>
                              <li>
                                Zero integration fee{' '}
                                <img src={checkedIcon} alt="check" width="20" />
                              </li>
                              <li>
                                Zero maintenance fee{' '}
                                <img src={checkedIcon} alt="check" width="20" />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default withRouter(PricingPage);
=======
import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Nav } from '../components/home/Nav';
import { Footer } from '../components/home/Footer';
import { path } from '../helpers/path';
import { checkedIcon } from '../images/Images';

interface PricingProps {}

const PricingPage: React.FC<PricingProps> = () => {
  const [amount, setAmount] = useState('');
  const [settle, setSettle] = useState(0);
  const [fee, setFee] = useState(0);
  const percent = 0.03;

  const onChange = (e: React.FormEvent<EventTarget>): void => {
    const { value } = e.target as HTMLTextAreaElement;
    if (value === '') {
      setSettle(0);
      setFee(0);
      setAmount('');
    } else {
      setAmount(value);
      const f = percent * parseFloat(value);
      const s = parseFloat(value) - f;
      setSettle(s);
      setFee(f);
    }
  };

  return (
    <section
      className="home-page"
      data-spy="scroll"
      data-target="#navbarResponsive"
    >
      <Helmet>
        <title>Araka | Pricing</title>
      </Helmet>
      <Nav />
      <section className="card-section">
        <div className="container">
          <div className="row vertical-content">
            <div className="pricing-intro">
              <h2>Pricing built for businesses of all sizes</h2>
              <h4>Always know what you will pay.</h4>
            </div>
            <div className="col-12">
              <div id="generic_price_table">
                <section>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="generic_content clearfix">
                          <div className="generic_head_price clearfix">
                            <div className="generic_head_content clearfix">
                              <div className="head_bg"></div>
                              <div className="head">
                                <span>Araka Users</span>
                              </div>
                            </div>
                            <div
                              className="generic_price_tag clearfix"
                              style={{ margin: '50px' }}
                            >
                              <span className="price">
                                <span className="currency">3%</span>
                                <p>on all debit/credit card payments</p>
                              </span>
                            </div>
                          </div>

                          <div className="generic_feature_list">
                            <ul>
                              <li>
                                <span>2%</span> on all mobile money payments
                              </li>
                              <li>
                                <span>1%</span> on all EFT payments
                              </li>
                            </ul>
                          </div>
                          <div className="generic_price_btn clearfix">
                            <Link className="" to={path.payment}>
                              Get started in minutes
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="generic_content active clearfix">
                          <div className="generic_head_price clearfix">
                            <div className="generic_head_content clearfix">
                              <div className="head_bg"></div>
                              <div className="head">
                                <span>Araka Merchants</span>
                              </div>
                            </div>

                            <div
                              className="generic_price_tag clearfix"
                              style={{ margin: '50px' }}
                            >
                              <span className="price">
                                <span className="currency">3%</span>
                                <p>on all debit/credit card payments</p>
                              </span>
                            </div>
                          </div>

                          <div className="generic_feature_list">
                            <ul>
                              <li>
                                <span>2%</span> on all mobile money payments
                              </li>
                              <li>
                                <span>1%</span> on all EFT payments
                              </li>
                            </ul>
                          </div>
                          <div className="generic_price_btn clearfix">
                            <Link
                              className=""
                              to=""
                              style={{ visibility: 'hidden' }}
                            >
                              Access merchant account
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div id="generic_price_table">
                <section>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="clearfix">
                          <div className="math-instruction">
                            <h2>Do the math</h2>
                            <p>
                              See how much it costs to use ARAKA. Enter an
                              amount into the calculator to see our charges
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="generic_content active clearfix">
                          <div
                            className="generic_head_price clearfix"
                            style={{
                              background: '#f55c29',
                            }}
                          >
                            <div className="generic_head_content clearfix">
                              <div className="head">
                                <span
                                  style={{
                                    color: '#fff',
                                    fontSize: '2rem',
                                    fontWeight: 300,
                                  }}
                                >
                                  If your customer pays
                                </span>
                              </div>
                            </div>

                            <div className="generic_price_tag clearfix">
                              <input
                                name="amount"
                                className="form-control"
                                type="number"
                                placeholder="USD"
                                value={amount}
                                onChange={onChange}
                                min={0}
                              />
                            </div>
                          </div>
                          <div className="result-holder">
                            <div className="settle">
                              <h2>We'll settle you</h2>
                              <h4>USD {settle.toFixed(2)}</h4>
                            </div>
                            <div className="araka-fees">
                              <h2>ARAKA Fees</h2>
                              <h4>USD {fee.toFixed(2)}</h4>
                            </div>
                          </div>

                          <div className="generic_feature_list-a">
                            <ul>
                              <li>
                                Free, automatic settlement within 48 hours{' '}
                                <img src={checkedIcon} alt="check" width="20" />
                              </li>
                              <li>
                                No hidden fees or charges{' '}
                                <img src={checkedIcon} alt="check" width="20" />
                              </li>
                              <li>
                                Zero integration fee{' '}
                                <img src={checkedIcon} alt="check" width="20" />
                              </li>
                              <li>
                                Zero maintenance fee{' '}
                                <img src={checkedIcon} alt="check" width="20" />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default withRouter(PricingPage);
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
