<<<<<<< HEAD
import React from 'react';
import { Form } from 'react-formio';

const FormIO = ({ schema, options, onChange, initialValues }) => {
  return (
    <React.Fragment>
      {
        initialValues !== undefined ? <Form form={schema} options={options} onChange={onChange} submission={{ data: initialValues }} /> : <Form form={schema} options={options} onChange={onChange} /> 
      }
      
    </React.Fragment>
  );
};

export { FormIO };
=======
import React from 'react';
import { Form } from 'react-formio';

const FormIO = ({ schema, options, onChange, initialValues }) => {
  return (
    <React.Fragment>
      {
        initialValues !== undefined ? <Form form={schema} options={options} onChange={onChange} submission={{ data: initialValues }} /> : <Form form={schema} options={options} onChange={onChange} /> 
      }
      
    </React.Fragment>
  );
};

export { FormIO };
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
