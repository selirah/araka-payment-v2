import React from 'react';
import { ChangePassword } from '../../interfaces';
import { Success } from '../common/Success';
import { SingleError } from '../auth/SingleError';

interface ChangePasswordFormProps {
  onChange(e: React.FormEvent<EventTarget>): void;
  values: ChangePassword;
  loading: boolean;
  btnTitle: string;
  onSubmit(e: React.FormEvent<EventTarget>): void;
  isSuccess: boolean;
  btnIcon: string;
  message: string;
  isError: boolean;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onChange,
  values,
  loading,
  btnTitle,
  onSubmit,
  isSuccess,
  btnIcon,
  message,
  isError,
}) => {
  return (
    <form className="recipient-form" onSubmit={onSubmit}>
      {isSuccess ? <Success message={message} /> : null}
      {isError ? <SingleError error={message} /> : null}
      <div className="row justify-content-center">
        <input
          type="password"
          className="form-input-text"
          onChange={onChange}
          value={values.OldPassword}
          name="OldPassword"
          placeholder="Old password"
          required
        />
      </div>

      <div className="row justify-content-center">
        <input
          type="password"
          className="form-input-text"
          onChange={onChange}
          value={values.NewPassword}
          name="NewPassword"
          placeholder="New password"
          required
        />
      </div>
      <div className="row justify-content-center">
        <input
          type="password"
          className="form-input-text"
          onChange={onChange}
          value={values.ConfirmPassword}
          name="ConfirmPassword"
          placeholder="Confirm new password"
          required
        />
      </div>
      <div className="row justify-content-center">
        <button className="btn" disabled={loading}>
          <i className={`fa ${loading ? 'fa-spinner fa-spin' : btnIcon}`}></i>{' '}
          {btnTitle}
        </button>
      </div>
    </form>
  );
};
