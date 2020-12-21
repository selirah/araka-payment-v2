import React from 'react';
import { Helmet } from 'react-helmet';
import { Nav } from './Nav';
import { Banner } from './Banner';
import { Slider } from './Slider';
import { Description } from './Description';
import { Card } from './Card';
import { Footer } from './Footer';

type Props = {
  title: string;
};

const Layout: React.FC<Props> = ({ title }) => (
  <section
    className="home-page"
    data-spy="scroll"
    data-target="#navbarResponsive"
  >
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Nav />
    <Banner />
    <Description />
    <Card />
    <Slider />
    <Footer />
  </section>
);

export { Layout };
