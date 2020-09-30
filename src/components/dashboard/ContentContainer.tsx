import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const ContentContainer: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="row">
      <div className="col-xl-12 col-lg-11">
        <div className="card mb-4">
          <div className="card-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export { ContentContainer };
