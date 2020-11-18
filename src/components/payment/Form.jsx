import React from 'react';
import { Form } from 'react-formio';

const FormIO = ({ schema, options, onChange, initialValues, isRepeat }) => {
  return (
    <React.Fragment>
      {
        isRepeat ? <Form form={schema} options={options} onChange={onChange} submission={{ data: initialValues }} /> : <Form form={schema} options={options} onChange={onChange} /> 
      }
      
    </React.Fragment>
  );
};

export { FormIO };
