import React from 'react';
// import { useDispatch } from 'react-redux';
import { i18n } from '../../i18n';
import { Form } from 'react-formio';
// import { saveOrderData } from '../../store/payment';

const FormIO = ({ schema }) => {
  const locale = localStorage.getItem('i18nextLng');
  // const dispatch = useDispatch();
  const options = {
    language: locale !== null ? locale : 'en',
    i18n: i18n,
    readOnly: false,
    noAlerts: true,
  };

  const onChange = (submission) => {
    // dispatch(saveOrderData(submission));
    delete submission.changed;
    localStorage.setItem('orderData', JSON.stringify(submission));
  };

  return (
    <React.Fragment>
      <Form form={schema} options={options} onChange={onChange} />
    </React.Fragment>
  );
};

export { FormIO };
