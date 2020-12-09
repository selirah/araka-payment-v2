import React from 'react';
import { useField, FieldInputProps } from 'formik';
import { IFormField } from '../../models/IFormField';
import { isEmpty } from '../../helpers/isEmpty';

interface IField extends IFormField, FieldInputProps<''> {}

const FormField: React.FC<IField> = ({ ...props }: IField) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <div className="form-group">
        <input className="form-control" {...field} {...props} />
        {!isEmpty(meta.error) && meta.touched ? (
          <small className="text-danger">{meta.error}</small>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export { FormField };
