import React from 'react';
import { Helmet } from 'react-helmet';

const Title: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export { Title };
