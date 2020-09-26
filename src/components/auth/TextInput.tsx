import React from 'react';
import {
  FormBoxInput,
  FormBoxInputText,
  FormBoxInputSpan,
  ErrorSpan,
} from './Styles';

type Props = {
  type: string;
  name: string;
  value: any;
  placeholder: string;
  icon: string;
  error?: string;
  onChange(e: React.FormEvent<EventTarget>): void;
};
const TextInput: React.FC<Props> = ({
  type,
  name,
  value,
  placeholder,
  icon,
  error,
  onChange,
}) => {
  return (
    <React.Fragment>
      <FormBoxInput>
        <FormBoxInputSpan>
          <i className={`fa ${icon}`}></i>
        </FormBoxInputSpan>
        <FormBoxInputText
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <ErrorSpan>
          <span>{error}</span>
        </ErrorSpan>
      </FormBoxInput>
    </React.Fragment>
  );
};

export { TextInput };
