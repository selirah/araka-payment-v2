import React from 'react';
import { i18n } from '../../i18n';
import { Form } from 'react-formio';
import { secure } from '../../utils/secure';
// import { useDispatch } from 'react-redux';
// import { setFormValidation } from '../../store/payment';

const FormIO = ({ schema }) => {
  // const dispatch = useDispatch();
  const locale = localStorage.getItem('i18nextLng');
  const options = {
    language: locale !== null ? locale : 'en',
    i18n: i18n,
    readOnly: false,
    noAlerts: true,
  };

  const onChange = (submission) => {
    delete submission.changed;
    secure.set('orderData', submission);
    localStorage.setItem('isValid', submission.isValid);
  };

  return (
    <React.Fragment>
      <Form form={schema} options={options} onChange={onChange} />
    </React.Fragment>
  );
};

export { FormIO };
