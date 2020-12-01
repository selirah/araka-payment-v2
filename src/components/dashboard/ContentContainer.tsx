<<<<<<< HEAD
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const ContentContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="card mb-4">
          <div className="card-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export { ContentContainer };
=======
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const ContentContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="card mb-4">
          <div className="card-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export { ContentContainer };
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
