import React from 'react';

type Props = {
  h2?: string;
  h4?: string;
  h6?: string;
};

const DisplayHeader: React.FC<Props> = ({ h2, h4, h6 }) => (
  <React.Fragment>
    <div className="display-name text-center">
      {h2 !== undefined ? <h2>{h2}</h2> : null}
      {h4 !== undefined ? <h4>{h4}</h4> : null}
      {h6 !== undefined ? <h6>{h6}</h6> : null}
    </div>
  </React.Fragment>
);

export { DisplayHeader };
