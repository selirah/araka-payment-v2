import Validator from 'validator';
import { isEmpty } from '../isEmpty';
import { Register } from '../../models/Register';
import { IRegister } from '../../models/IRegister';

export const validateRegisterInput = (data: IRegister) => {
  let errors = new Register();
  data.Name = !isEmpty(data.Name) ? data.Name : '';
  data.EmailAddress = !isEmpty(data.EmailAddress) ? data.EmailAddress : '';
  data.PhoneNumber = !isEmpty(data.PhoneNumber) ? data.PhoneNumber : '';
  data.Password = !isEmpty(data.Password) ? data.Password : '';

  if (!Validator.isLength(data.Name, { min: 5, max: 30 })) {
    errors.Name = 'Name must be between 5 and 30 characters long';
  }

  if (Validator.isEmpty(data.Name)) {
    errors.Name = 'Name field is required';
  }

  if (!Validator.isEmail(data.EmailAddress)) {
    errors.EmailAddress = 'Email is invalid';
  }

  if (Validator.isEmpty(data.EmailAddress)) {
    errors.EmailAddress = 'Email field is required';
  }

  if (!Validator.isLength(data.Password, { min: 6, max: 30 })) {
    errors.Password = 'Pasword must be at least 6 characters';
  }

  if (Validator.isEmpty(data.Password)) {
    errors.Password = 'Password field is required';
  }

  if (Validator.isEmpty(data.PhoneNumber)) {
    errors.PhoneNumber = 'Phone Number field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
