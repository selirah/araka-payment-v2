import React from 'react';

const Section: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <section className="offset">{children}</section>;
};

export { Section };
