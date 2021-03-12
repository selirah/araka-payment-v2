import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { user as avatar } from '../../images/Images';
import {
  setEditAccount,
  getCurrentUser,
  clearSomeBooleans,
  changePasswordRequest,
} from '../../store/dashboard';
import { Client, ChangePassword } from '../../interfaces';
import { Spinner } from '../common/Spinner';
import moment from 'moment';
import { Success } from '../common/Success';
import { ChangePasswordForm } from './ChangePasswordForm';
import { modalTypes } from '../../helpers/constants';
import { ModalContainer } from '../common/ModalContainer';

export const Account: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    clientLoading,
    client,
    editAccountSuccess,
    isSubmitting,
    success,
    error,
    failure,
  } = appSelector((state) => state.dashboard);
  const { user } = appSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState<Client | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(clientLoading);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSuccessPassword, setIsSuccessPassword] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [values, setValues] = useState<ChangePassword>({
    NewPassword: '',
    OldPassword: '',
    ConfirmPassword: '',
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [message, setMessage] = useState('');

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
    setIsSubmit(isSubmitting);
    if (success) {
      setIsSuccessPassword(success);
      setMessage('Password Changed Successfully');
    }
    if (failure) {
      setIsError(true);
      setMessage(error);
    }
  }, [
    client,
    clientLoading,
    editAccountSuccess,
    dispatch,
    isSubmitting,
    success,
    error,
    failure,
  ]);

  const onEditAccountClick = (): void => {
    dispatch(setEditAccount(true));
  };

  const onChange = (e: React.FormEvent<EventTarget>): void => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setValues({ ...values, [name]: value });
  };

  const onShowModalClick = (type: string): void => {
    setShowModal(true);
    setModalType(type);
    setIsError(false);
    setMessage('');
    setIsSuccessPassword(false);
    dispatch(clearSomeBooleans());
  };

  const onCloseModal = (): void => {
    setShowModal(false);
    setModalType('');
    setIsError(false);
    setMessage('');
    setIsSuccessPassword(false);
    dispatch(clearSomeBooleans());
  };

  const onSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    setIsError(false);
    if (values.NewPassword !== values.ConfirmPassword) {
      setIsError(true);
      setMessage('Passwords do not match!');
    } else {
      const payload: ChangePassword = {
        NewPassword: values.NewPassword,
        OldPassword: values.OldPassword,
      };
      dispatch(changePasswordRequest(payload));
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="user-profile-photo">
          <img src={avatar} alt="profile" />
          {/* <button className="btn">Add account photo</button> */}
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
                <h4>*********************</h4>
                <button
                  className="btn"
                  onClick={() => onShowModalClick(modalTypes.CHANGE_PASSWORD)}
                >
                  <i className="fa fa-key"></i> Change Password
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
      {showModal && modalType === modalTypes.CHANGE_PASSWORD ? (
        <ModalContainer
          show={showModal}
          onClose={onCloseModal}
          header="Change Password"
        >
          <ChangePasswordForm
            btnTitle="Change Password"
            loading={isSubmit}
            onChange={onChange}
            values={values}
            onSubmit={onSubmit}
            isSuccess={isSuccessPassword}
            btnIcon="fa-plus"
            message={message}
            isError={isError}
          />
        </ModalContainer>
      ) : null}
    </div>
  );
};
