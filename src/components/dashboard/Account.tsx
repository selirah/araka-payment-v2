import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { user as avatar } from '../../images/Images';
import {
  setEditAccount,
  getCurrentUser,
  clearSomeBooleans,
} from '../../store/dashboard';
import { Client } from '../../interfaces';
import { Spinner } from '../common/Spinner';
import moment from 'moment';
import { Success } from '../common/Success';

export const Account: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { clientLoading, client, editAccountSuccess } = appSelector(
    (state) => state.dashboard
  );
  const { user } = appSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState<Client | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(clientLoading);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    // fecth current logged in user
    if (user !== undefined && client === undefined) {
      dispatch(getCurrentUser(user.userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(clientLoading);
    setIsSuccess(editAccountSuccess);
    setTimeout(() => dispatch(clearSomeBooleans()), 5000);
    if (client !== undefined) {
      setCurrentUser(client);
    }
  }, [client, clientLoading, editAccountSuccess, dispatch]);

  const onEditAccountClick = (): void => {
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
            {isSuccess ? <Success message="Updated successfully" /> : null}
            <div className="personal-info">
              <h4>Personal Information</h4>
              <button className="btn" onClick={() => onEditAccountClick()}>
                <i className="fa fa-edit"></i> Edit Details
              </button>
            </div>
            <div className="personal-details">
              <div className="personal-details-left">
                <h2>Full legal first and middle names</h2>
                <h4>
                  {currentUser !== undefined
                    ? `${currentUser.firstName} ${currentUser.otherName}`
                    : null}
                </h4>
                <h2>Date of Birth</h2>
                <h4>
                  {currentUser !== undefined
                    ? moment(currentUser.dateOfBirth).format('MMMM Do, YYYY')
                    : null}
                </h4>
              </div>
              <div className="personal-details-right">
                <h2>Full legal last name(s)</h2>
                <h4>
                  {currentUser !== undefined ? currentUser.lastName : null}
                </h4>
                <h2>Phone number</h2>
                <h4>
                  +{currentUser !== undefined ? currentUser.phoneNumber : null}
                </h4>
              </div>
            </div>
            <div className="personal-info">
              <h4>Personal Address</h4>
            </div>
            <div className="personal-details">
              <div className="personal-details-left">
                <h2>Country</h2>
                <h4>
                  {currentUser !== undefined ? currentUser.country : null}
                </h4>
                <h2>Address</h2>
                <h4>
                  {currentUser !== undefined ? currentUser.address : null}
                </h4>
              </div>
              <div className="personal-details-right">
                <h2>City</h2>
                <h4>{currentUser !== undefined ? currentUser.city : null}</h4>
                <h2>Postal</h2>
              </div>
            </div>
            <div className="personal-info">
              <h4>Account Information</h4>
            </div>
            <div className="personal-details">
              <div className="personal-details-left">
                <h2>Email</h2>
                <h4>{user !== undefined ? user.username : null}</h4>
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
