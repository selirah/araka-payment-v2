import React, { useState, useEffect } from 'react';
import { User } from 'src/interfaces';
import { appSelector } from '../../helpers/appSelector';
import { Link } from 'react-router-dom';
import { path } from '../../helpers/path';

const Content: React.FC = () => {
  const { user } = appSelector((state) => state.auth);
  const [userDetails] = useState<User>(user);
  const [fname, setFname] = useState('');

  useEffect(() => {
    if (userDetails !== undefined) {
      let name: string[] | undefined;
      name = userDetails.name?.split(' ');
      if (name !== undefined) {
        setFname(name[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="new-user">
            <div className="top-display">Hey {fname}!, Ready to start</div>
            <div className="bottom-display">making payments?</div>
            <div className="payment-button">
              <Link to={path.payment} className="btn btn-make-payment">
                yes, let's do it!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { Content };
