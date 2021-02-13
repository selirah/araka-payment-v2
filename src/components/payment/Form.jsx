import React from 'react';
import { Form } from 'react-formio';

const FormIO = ({ schema, options, onChange, initialValues, repopulateForm, data }) => {
  let content;

  if (initialValues !== undefined) {
    content = <Form form={schema} options={options} onChange={onChange} submission={{ data: initialValues }} />
  }
  else if (repopulateForm && data !== undefined) {
    content = <Form form={schema} options={options} onChange={onChange} submission={{ data: data.data }} /> 
  } else {
    content = <Form form={schema} options={options} onChange={onChange} />
  }

  return (
    <React.Fragment>
      {
        content
      }
    </React.Fragment>
  );
};

export { FormIO };
