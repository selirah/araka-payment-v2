import React, { useState } from 'react';
import {
  FormBoxInput,
  FormBoxInputText,
  PassWrapper,
  IconEye,
  ErrorSpan,
} from './Styles';

type Props = {
  type: string;
  name: string;
  value: any;
  placeholder: string;
  error?: string;
  onChange(e: React.FormEvent<EventTarget>): void;
};
const PasswordInput: React.FC<Props> = ({
  type,
  name,
  value,
  placeholder,
  error,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <React.Fragment>
      <FormBoxInput>
        <PassWrapper>
          <FormBoxInputText
            type={showPassword ? 'text' : type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
          <IconEye>
            <i
              className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => togglePasswordVisibility()}
            ></i>
          </IconEye>
        </PassWrapper>
        <ErrorSpan>{error}</ErrorSpan>
      </FormBoxInput>
    </React.Fragment>
  );
};

export { PasswordInput };
