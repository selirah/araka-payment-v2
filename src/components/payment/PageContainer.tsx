import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const PageContainer: React.FC<Props> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export { PageContainer };
