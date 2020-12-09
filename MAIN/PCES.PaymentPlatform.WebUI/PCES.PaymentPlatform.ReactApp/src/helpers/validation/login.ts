import Validator from 'validator';
import { isEmpty } from '../isEmpty';
import { Login } from '../../models/Login';
import { ILogin } from '../../models/ILogin';

export const validateLoginInput = (data: ILogin) => {
  let errors = new Login();
  data.EmailAddress = !isEmpty(data.EmailAddress) ? data.EmailAddress : '';
  data.Password = !isEmpty(data.Password) ? data.Password : '';

  if (!Validator.isEmail(data.EmailAddress)) {
    errors.EmailAddress = 'Email is invalid';
  }

  if (Validator.isEmpty(data.EmailAddress)) {
    errors.EmailAddress = 'Email field is required';
  }

  if (Validator.isEmpty(data.Password)) {
    errors.Password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
