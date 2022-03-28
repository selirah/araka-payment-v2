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
      <section className="card-section about-section">
        <div className="container">
          <div className="row vertical-content">
            <div className="col-12">
              <div className="about-araka text-left">
                <h2>About ARAKA</h2>
                <p>
                  We are a multi-application and multi-channel payment 
                  platform that offers a wide range of digital financial 
                  services to corporations and retail customers.
                </p>
                <p>
                  Our easy to use electronic KYC platform facilitates merchant’s 
                  onboarding in very few steps. We want to be part of the financial 
                  inclusion process by offering affordable services to our partners and users.
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="araka-mission text-left">
                <h2>Our Mission</h2>
                <p>
                  To provide secured, convenient and cost effective means to make and receive payments
                </p>
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
