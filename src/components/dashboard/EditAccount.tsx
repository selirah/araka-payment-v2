import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../helpers/appDispatch';
import { appSelector } from '../../helpers/appSelector';
import { Client } from '../../interfaces';
import countriesList from 'countries-list';
import PhoneInput from 'react-phone-input-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateUserRequest, setEditAccount } from '../../store/dashboard';
import moment from 'moment';
import { Error } from '../common/Error';

export const EditAccount: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = appSelector((state) => state.auth);
  const {
    client,
    isEditing,
    editAccountSuccess,
    redirect,
    editAccountFailure,
  } = appSelector((state) => state.dashboard);
  const [values, setValues] = useState<Client>({
    clientId: client!.clientId,
    fullName: client!.fullName,
    firstName: client!.firstName !== null ? client!.firstName : '',
    otherName: client!.otherName !== null ? client!.otherName : '',
    lastName: client!.lastName !== null ? client!.lastName : '',
    dateOfBirth: client!.dateOfBirth !== null ? client!.dateOfBirth : '',
    address: client!.address !== null ? client!.address : '',
    email: client!.email,
    country: client!.country !== null ? client!.country : '',
    city: client!.city !== null ? client!.city : '',
    phoneNumber: client!.phoneNumber,
    userId: client!.userId,
    user: client?.user,
  });
  const [phone, setPhone] = useState<string>(values.phoneNumber);
  const [startDate, setStartDate] = useState<Date>(
    moment().subtract(18, 'years').toDate()
  );
  const [newDate, setNewDate] = useState<string>(values.dateOfBirth);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [changeDate, setChangeDate] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  let selectCountries: React.ReactNode;
  const { countries }: any = countriesList;
  selectCountries = Object.keys(countries).map(function (key, index) {
    return (
      <option value={countries[key].name} key={index}>
        {countries[key].name}
      </option>
    );
  });

  const onChange = (e: React.FormEvent<EventTarget>): void => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setValues({ ...values, [name]: value });
  };

  const setPhoneNumber = (e: string): void => {
    setPhone(e);
  };

  const setDate = (e: Date): void => {
    let v: string = moment(e).format('YYYY-MM-DD');
    setNewDate(v);
    setStartDate(e);
    setChangeDate(true);
  };

  const onSubmit = (e: React.FormEvent<EventTarget>): void => {
    setIsError(false);
    e.preventDefault();
    if (phone.length < 10) {
      setIsError(true);
    } else {
      const payload: Client = {
        clientId: client!.clientId,
        fullName: `${values.firstName} ${values.otherName} ${values.lastName}`,
        firstName: values.firstName,
        otherName: values.otherName,
        lastName: values.lastName,
        dateOfBirth:
          newDate === '' ? moment(startDate).format('YYYY-MM-DD') : newDate,
        address: values.address,
        email: user!.username,
        country: values.country,
        city: values.city,
        phoneNumber: phone,
        userId: client!.userId,
        user: client?.user,
      };
      // console.log(payload);
      dispatch(updateUserRequest(payload));
    }
  };

  useEffect(() => {
    setIsSubmitting(isEditing);
    if (redirect) {
      if (editAccountSuccess) {
        dispatch(setEditAccount(false));
      }
    }
    if (editAccountFailure) {
      setIsError(editAccountFailure);
    }
  }, [isEditing, editAccountSuccess, dispatch, redirect, editAccountFailure]);

  return (
    <div className="row">
      <div className="col-12">
        <form onSubmit={onSubmit}>
          {isError ? <Error error="Phone number is required" /> : null}
          <div className="personal-info">
            <h4>Personal Information</h4>
            <button className="btn" type="submit">
              <i
                className={`fa ${
                  isSubmitting ? 'fa-spinner fa-spin' : 'fa-save'
                }`}
              ></i>{' '}
              Save Changes
            </button>
          </div>
          <div className="personal-details-form">
            <div className="left">
              <h2>Full legal first name</h2>
              <input
                type="text"
                className="text-input"
                onChange={onChange}
                value={values.firstName}
                name="firstName"
              />
              <h2>Other names</h2>
              <input
                type="text"
                className="text-input"
                onChange={onChange}
                value={values.otherName}
                name="otherName"
              />
            </div>
            <div className="right">
              <h2>Full legal last name(s)</h2>
              <input
                type="text"
                className="text-input"
                onChange={onChange}
                value={values.lastName}
                name="lastName"
              />
              <h2>Date of Birth</h2>
              <DatePicker
                selected={
                  values.dateOfBirth !== '' && !changeDate
                    ? moment(values.dateOfBirth).toDate()
                    : startDate
                }
                onChange={setDate}
                className="text-input"
                dateFormat="yyyy-MM-dd"
                showYearDropdown
                showMonthDropdown
                scrollableMonthYearDropdown
                minDate={moment().subtract(70, 'years').toDate()}
                maxDate={moment().subtract(18, 'years').toDate()}
              />
            </div>
          </div>
          <div className="personal-info">
            <h4>Personal Address</h4>
          </div>
          <div className="personal-details-form">
            <div className="left">
              <h2>Phone number</h2>
              <PhoneInput
                value={phone}
                country="gh"
                preferredCountries={['gh', 'cd', 'us', 'gb']}
                onChange={setPhoneNumber}
                inputStyle={{
                  paddingLeft: '3rem',
                }}
                inputClass="text-input"
                buttonClass="drop-style"
                buttonStyle={{
                  border: '0.0625rem solid #e0e0e0',
                  background: '#FFF',
                  padding: '0.2rem',
                  borderRadius: '0',
                }}
                dropdownClass="drop-style"
                dropdownStyle={{
                  textAlign: 'left',
                  fontSize: '0.8rem',
                  fontWeight: 'normal',
                }}
                // inputProps={{
                //   required: true,
                // }}
              />
              <h2>Country</h2>
              <select
                className="text-select"
                onChange={onChange}
                value={values.country}
                name="country"
              >
                <option value="">--- Select One ---</option>
                {selectCountries}
              </select>
            </div>
            <div className="right">
              <h2>Address</h2>
              <input
                type="text"
                className="text-input"
                onChange={onChange}
                value={values.address}
                name="address"
              />
              <h2>City</h2>
              <input
                type="text"
                className="text-input"
                onChange={onChange}
                value={values.city}
                name="city"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
