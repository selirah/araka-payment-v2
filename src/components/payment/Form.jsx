import React from 'react';
import { Form } from 'react-formio';

const FormIO = ({ schema, options, onChange, initialValues }) => {
  return (
    <React.Fragment>
      <Form form={schema} options={options} onChange={onChange} submission={{ data: initialValues }} />
    </React.Fragment>
  );
};

export { FormIO };
