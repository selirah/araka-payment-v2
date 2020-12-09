import React from 'react';
import { Beneficiary } from '../../interfaces';
import PhoneInput from 'react-phone-input-2';
import { Success } from '../common/Success';

interface RecipientFormProps {
  onChange(e: React.FormEvent<EventTarget>): void;
  values: Beneficiary;
  phone: string;
  setPhoneNumber(e: any): void;
  loading: boolean;
  btnTitle: string;
  onSubmit(e: React.FormEvent<EventTarget>): void;
  isSuccess: boolean;
  btnIcon: string;
  message: string;
}

export const RecipientForm: React.FC<RecipientFormProps> = ({
  onChange,
  values,
  phone,
  setPhoneNumber,
  loading,
  btnTitle,
  onSubmit,
  isSuccess,
  btnIcon,
  message,
}) => {
  return (
    <form className="recipient-form" onSubmit={onSubmit}>
      {isSuccess ? <Success message={message} /> : null}
      <div className="row justify-content-center">
        <input
          type="text"
          className="form-input-text"
          onChange={onChange}
          value={values.name}
          name="name"
          placeholder="Name"
          required
        />
      </div>
      <div className="row justify-content-center">
        <PhoneInput
          value={phone}
          country="gh"
          preferredCountries={['gh', 'cd', 'us', 'gb']}
          onChange={setPhoneNumber}
          inputStyle={{
            paddingLeft: '3rem',
            borderRadius: '0',
            marginLeft: '14.7rem',
            height: '3rem',
            width: '20rem',
          }}
          inputClass="form-input-text"
          buttonClass="form-input-drop"
          buttonStyle={{
            border: '0.0625rem solid #e0e0e0',
            background: '#FFF',
            padding: '0.2rem',
            borderRadius: '0',
            marginLeft: '14.7rem',
            height: '3rem',
          }}
          dropdownClass="drop-style"
          dropdownStyle={{
            textAlign: 'left',
            fontSize: '0.8rem',
            fontWeight: 'normal',
          }}
        />
      </div>
      <div className="row justify-content-center">
        <input
          type="text"
          className="form-input-text"
          onChange={onChange}
          value={values.studentId}
          name="studentId"
          placeholder="Student ID"
        />
      </div>
      <div className="row justify-content-center">
        <input
          type="text"
          className="form-input-text"
          onChange={onChange}
          value={values.email}
          name="email"
          placeholder="Email address"
        />
      </div>
      <div className="row justify-content-center">
        <input
          type="text"
          className="form-input-text"
          onChange={onChange}
          value={values.bankAccount}
          name="bankAccount"
          placeholder="Account Number"
        />
      </div>
      <div className="row justify-content-center">
        <input
          type="text"
          className="form-input-text"
          onChange={onChange}
          value={values.additionalInfo}
          name="additionalInfo"
          placeholder="Additional information"
        />
      </div>
      <div className="row justify-content-center">
        <button className="btn">
          <i className={`fa ${loading ? 'fa-spinner fa-spin' : btnIcon}`}></i>{' '}
          {btnTitle}
        </button>
      </div>
    </form>
  );
};
