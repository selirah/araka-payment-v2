import React from 'react';
import { Form } from 'react-formio';

const FormIO = ({ schema, options, onChange }) => {
  return (
    <React.Fragment>
      <Form form={schema} options={options} onChange={onChange} />
    </React.Fragment>
  );
};

export { FormIO };
