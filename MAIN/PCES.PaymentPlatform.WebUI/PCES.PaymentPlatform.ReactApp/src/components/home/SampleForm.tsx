import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form as FormikForm, Formik, FormikProps } from 'formik';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Button } from '../form/Button';
import { FormField } from '../form/FormField';
import { IFormSchema } from '../../models/IFormSchema';
import { HomeActionTypes } from '../../store/home';
import { modalContent } from '../../helpers/home.helper/constants';
import * as Yup from 'yup';

interface IValues {
  [key: string]: any;
}

const Form: React.FC<{
  formSchema: IFormSchema[];
  prevHeaderState: string;
}> = ({ formSchema, prevHeaderState }) => {
  const dispatch: AppDispatch = useDispatch();
  const home = appSelector((state) => state.home);
  const [isSubmitting, setIsSubmitting] = useState(false);

  let _formData: IValues = {};
  let _validationSchema: any = {};

  for (let i = 0; i < formSchema.length; i++) {
    _formData[formSchema[i].key] = '';

    if (formSchema[i].inputType === 'text') {
      _validationSchema[formSchema[i].key] = Yup.string();
      // .min(2, `Value must be between 2 and 50 characters`)
      // .max(50, 'Value must be between 2 and 50 characters');
    } else if (formSchema[i].inputType === 'email') {
      _validationSchema[formSchema[i].key] = Yup.string().email(
        'Please enter a valid email'
      );
    }

    if (formSchema[i].validate.required === true) {
      // _validationSchema[formSchema[i].key] = _validationSchema[
      //   formSchema[i].key
      // ].required('Ths field is required');
    }
  }

  const validationSchema = Yup.object().shape(_validationSchema);

  useEffect(() => {
    const { isSubmitting } = home;
    setIsSubmitting(isSubmitting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [home]);

  const onSubmit = (values: IValues): void => {
    dispatch({ type: HomeActionTypes.SET_SUBMITTING, payload: true });
    console.log(values);
  };

  const onCancelClick = (): void => {
    dispatch({
      type: HomeActionTypes.MODAL_CONTENT,
      payload: modalContent.MODAL_CONTENT_MERCHANTS,
    });
    dispatch({
      type: HomeActionTypes.MODAL_HEADER,
      payload: prevHeaderState,
    });
  };

  return formSchema ? (
    <React.Fragment>
      <Formik
        initialValues={_formData}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.resetForm();
        }}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<any>) => (
          <FormikForm>
            {formSchema.map(
              ({ inputType, placeholder, key, validate }: IFormSchema) => (
                <FormField
                  key={key}
                  name={key}
                  type={inputType}
                  placeholder={placeholder}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.start}
                  required={validate.required}
                />
              )
            )}
            <div className="form-group">
              <Button title="Submit" className="" loading={isSubmitting} />
              <button
                className="btn-submit btn-cancel-button"
                onClick={() => onCancelClick()}
              >
                Cancel
              </button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </React.Fragment>
  ) : null;
};

export { Form };
