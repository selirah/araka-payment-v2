<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'src/interfaces';
import { appSelector } from '../../helpers/appSelector';
import { Link } from 'react-router-dom';
import { path } from '../../helpers/path';

const NewUser: React.FC = () => {
  const { user } = appSelector((state) => state.auth);
  const [userDetails] = useState<User | undefined>(user);
  const [fname, setFname] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (userDetails !== undefined) {
      let name: string[] | undefined;
      if (userDetails.name !== null) {
        name = userDetails.name!.split(' ');
        setFname(name[0]);
      } else {
        setFname('Test Account');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="new-user">
            <div className="top-display">
              Hey {fname}! <br />
              {t('dashboard.new-user.ready')} {t('dashboard.new-user.making-payments')}
            </div>
            <div className="payment-button">
              <Link to={path.payment} className="btn btn-make-payment">
                {t('dashboard.new-user.yes')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { NewUser };
=======
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'src/interfaces';
import { appSelector } from '../../helpers/appSelector';
import { Link } from 'react-router-dom';
import { path } from '../../helpers/path';

const NewUser: React.FC = () => {
  const { user } = appSelector((state) => state.auth);
  const [userDetails] = useState<User | undefined>(user);
  const [fname, setFname] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (userDetails !== undefined) {
      let name: string[] | undefined;
      if (userDetails.name !== null) {
        name = userDetails.name!.split(' ');
        setFname(name[0]);
      } else {
        setFname('Test Account');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="new-user">
            <div className="top-display">
              Hey {fname}! <br />
              {t('dashboard.new-user.ready')} {t('dashboard.new-user.making-payments')}
            </div>
            <div className="payment-button">
              <Link to={path.payment} className="btn btn-make-payment">
                {t('dashboard.new-user.yes')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { NewUser };
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
