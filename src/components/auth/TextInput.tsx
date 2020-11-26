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
};
const TextInput: React.FC<Props> = ({
  type,
  name,
  value,
  placeholder,
  error,
  onChange,
  id,
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
        />
        <ErrorSpan>
          <span>{error}</span>
        </ErrorSpan>
      </FormBoxInput>
    </React.Fragment>
  );
};

export { TextInput };
