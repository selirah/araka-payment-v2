import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-formio';
import { i18n } from '../../i18n';
import { appSelector } from '../../helpers/appSelector';
import { HomeActionTypes } from '../../store/home';
import { modalContent } from '../../helpers/home.helper/constants';
import { processOrder } from '../../store/home/actions';

const FormIO = ({ formSchema, prevHeaderState }) => {
  const locale = localStorage.getItem('i18nextLng');
  const dispatch = useDispatch();
  const home = appSelector((state) => state.home);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const options = {
    language: locale !== null ? locale : 'en',
    i18n: i18n,
    readOnly: false,
    noAlerts: true,
  };

  const onCancelClick = () => {
    dispatch({
      type: HomeActionTypes.MODAL_CONTENT,
      payload: modalContent.MODAL_CONTENT_MERCHANTS,
    });
    dispatch({
      type: HomeActionTypes.MODAL_HEADER,
      payload: prevHeaderState,
    });
  };

  useEffect(() => {
    const { isSubmitting } = home;
    setIsSubmitting(isSubmitting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [home]);

  const onSubmit = (submission) => {
    dispatch(processOrder(submission));
  };

  const onSubmitDone = () => {};

  return (
    <React.Fragment>
      <Form
        form={formSchema}
        onSubmit={onSubmit}
        options={options}
        loading={isSubmitting}
        onSubmitDone={onSubmitDone}
        onError={(err) => console.log('ok')}
      />
      <div className="from-group">
        <button
          className="btn-submit btn-cancel-button btn-md"
          onClick={() => onCancelClick()}
        >
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
};

export { FormIO };
