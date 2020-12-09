import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-formio';
import { saveOrderData } from 'store-house/payment/actions';

const FormIO = ({ schema }) => {
  const dispatch = useDispatch();
  const options = {
    // language: locale !== null ? locale : 'en',
    // i18n: i18n,
    readOnly: false,
    noAlerts: true,
  };

  const onChange = (submission) => {
    dispatch(saveOrderData(submission));
  };

  return (
    <React.Fragment>
      <Form form={schema} options={options} onChange={onChange} />
    </React.Fragment>
  );
};

export { FormIO };
