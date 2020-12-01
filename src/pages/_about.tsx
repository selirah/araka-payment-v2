<<<<<<< HEAD
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Nav } from '../components/home/Nav';
import { Footer } from '../components/home/Footer';

interface AboutProps {}

const AboutPage: React.FC<AboutProps> = () => {
  return (
    <section
      className="home-page"
      data-spy="scroll"
      data-target="#navbarResponsive"
    >
      <Helmet>
        <title>Araka | About</title>
      </Helmet>
      <Nav />
      <section className="card-section">
        <div className="container">
          <div className="row vertical-content">
            <div className="col-12">
              <div className="col-6 mx-auto">
                <div className="about-araka text-center">
                  <h2>About ARAKA</h2>
                  <p>
                    We are a Congolese based multi-application and multi-channel
                    electronic payment platform of the notch customer experience
                    via our easy to use customer and enterprise interface
                  </p>
                  <p>
                    We specialize in the aggregation of payment systems and
                    offer a unique electronic KYC platform that allows merchants
                    to onboard themselves in very few steps. We are proud to be
                    participating in finacial inclusion by providing affordable
                    services to our partners and users.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="col-6 mx-auto">
                <div className="araka-mission text-center">
                  <h2>Our Mission</h2>
                  <p>
                    is to become the best and most affordable payment and
                    aggregation service provider in DRC with the aim of
                    providing a top of the notch customer experience via our
                    easy to use customer and experience interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default withRouter(AboutPage);
=======
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Nav } from '../components/home/Nav';
import { Footer } from '../components/home/Footer';

interface AboutProps {}

const AboutPage: React.FC<AboutProps> = () => {
  return (
    <section
      className="home-page"
      data-spy="scroll"
      data-target="#navbarResponsive"
    >
      <Helmet>
        <title>Araka | About</title>
      </Helmet>
      <Nav />
      <section className="card-section">
        <div className="container">
          <div className="row vertical-content">
            <div className="col-12">
              <div className="col-6 mx-auto">
                <div className="about-araka text-center">
                  <h2>About ARAKA</h2>
                  <p>
                    We are a Congolese based multi-application and multi-channel
                    electronic payment platform of the notch customer experience
                    via our easy to use customer and enterprise interface
                  </p>
                  <p>
                    We specialize in the aggregation of payment systems and
                    offer a unique electronic KYC platform that allows merchants
                    to onboard themselves in very few steps. We are proud to be
                    participating in finacial inclusion by providing affordable
                    services to our partners and users.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="col-6 mx-auto">
                <div className="araka-mission text-center">
                  <h2>Our Mission</h2>
                  <p>
                    is to become the best and most affordable payment and
                    aggregation service provider in DRC with the aim of
                    providing a top of the notch customer experience via our
                    easy to use customer and experience interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default withRouter(AboutPage);
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
