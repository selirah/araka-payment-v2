import React from 'react';
import { FormBoxInput, ErrorSpan } from './Styles';

type Props = {
  type: string;
  name: string;
  value: any;
  placeholder: string;
  error?: string;
  id?: string;
  onChange(e: React.FormEvent<EventTarget>): void;
  required?: boolean;
};
const TextInput: React.FC<Props> = ({
  type,
  name,
  value,
  placeholder,
  error,
  onChange,
  id,
  required = false,
}) => {
  return (
    <React.Fragment>
      <FormBoxInput>
        <input
          className="form-control"
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          id={id}
          required={required}
        />
        <ErrorSpan>
          <span>{error}</span>
        </ErrorSpan>
      </FormBoxInput>
    </React.Fragment>
  );
};

export { TextInput };
