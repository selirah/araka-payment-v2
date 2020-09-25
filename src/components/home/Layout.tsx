import React from 'react';
import { Helmet } from 'react-helmet';
import { Nav } from './Nav';
import { Background } from './Background';
import { Banner } from './Banner';
import { Slider } from './Slider';
import { Description } from './Description';
import { Card } from './Card';
import { Footer } from './Footer';

type Props = {
  title: string;
};

const Layout: React.FC<Props> = ({ title }) => (
  <section data-spy="scroll" data-target="#navbarResponsive">
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Background />
    <Nav />
    <Banner />
    <Slider />
    <Description />
    <Card />
    <Footer />
  </section>
);

export { Layout };
