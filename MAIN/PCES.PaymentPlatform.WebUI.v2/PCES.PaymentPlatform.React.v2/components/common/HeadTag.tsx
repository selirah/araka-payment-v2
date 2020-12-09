import React from 'react';
import Head from 'next/head';

type Props = {
  title?: string;
};

const HeadTag: React.FC<Props> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="Fast and secure payment platform for the internet."
      />
    </Head>
  );
};

export { HeadTag };
