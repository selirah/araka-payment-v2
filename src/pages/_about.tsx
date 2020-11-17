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
      <Footer />
    </section>
  );
};

export default withRouter(AboutPage);
