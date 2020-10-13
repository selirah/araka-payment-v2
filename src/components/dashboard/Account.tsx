import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { user as avatar } from '../../images/Images';
import { setEditAccount, getCurrentUser } from '../../store/dashboard';
import { Client } from '../../interfaces';
import { Spinner } from '../common/Spinner';

export const Account: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { clientLoading, client } = appSelector((state) => state.dashboard);
  const { user } = appSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState<Client | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(clientLoading);

  useEffect(() => {
    // fecth current logged in user
    if (user !== undefined && client === undefined) {
      dispatch(getCurrentUser(user.userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(clientLoading);
    if (client !== undefined) {
      setCurrentUser(client);
    }
  }, [client, clientLoading]);

  const onEditAccountClick = () => {
    dispatch(setEditAccount(true));
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="user-profile-photo">
          <img src={avatar} alt="profile" />
          <button className="btn">Add account photo</button>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <div className="personal-info">
              <h4>Personal Information</h4>
              <button className="btn" onClick={() => onEditAccountClick()}>
                <i className="fa fa-edit"></i> Edit Details
              </button>
            </div>
            <div className="personal-details">
              <div className="personal-details-left">
                <h2>Full legal first and middle names</h2>
                <h4>Morty Jr.</h4>
                <h2>Date of Birth</h2>
                <h4>1st January, 2002</h4>
              </div>
              <div className="personal-details-right">
                <h2>Full legal last name(s)</h2>
                <h4>Smith</h4>
                <h2>Phone number</h2>
                <h4>+456 453 3543 345</h4>
              </div>
            </div>
            <div className="personal-info">
              <h4>Personal Address</h4>
            </div>
            <div className="personal-details">
              <div className="personal-details-left">
                <h2>Country</h2>
                <h4>DRC.</h4>
                <h2>Address</h2>
                <h4>30 Paix Street</h4>
              </div>
              <div className="personal-details-right">
                <h2>City</h2>
                <h4>Kinshasa</h4>
                <h2>Postal</h2>
              </div>
            </div>
            <div className="personal-info">
              <h4>Account Information</h4>
            </div>
            <div className="personal-details">
              <div className="personal-details-left">
                <h2>Email</h2>
                <h4>prinzeedward@gmail.com</h4>
              </div>
              <div className="personal-details-right">
                <h2>Password</h2>
                <h4>*************************</h4>
                <button className="btn">
                  <i className="fa fa-key"></i> Change Password
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
