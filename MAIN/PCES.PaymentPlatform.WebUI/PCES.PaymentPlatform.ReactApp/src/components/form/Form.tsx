import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form as FormikForm, Formik, FormikProps } from 'formik';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Button } from './Button';
import { FormField } from './FormField';
import { IFormField } from '../../models/IFormField';
import { HomeActionTypes } from '../../store/home';
import { modalContent } from '../../helpers/home.helper/constants';
import * as Yup from 'yup';

interface IValues {
  [key: string]: any;
}

const Form: React.FC<{ formSchema: IFormField[]; prevHeaderState: string }> = ({
  formSchema,
  prevHeaderState,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const home = appSelector((state) => state.home);
  const [isSubmitting, setIsSubmitting] = useState(false);

  let _formData: IValues = {};
  let _validationSchema: any = {};
  for (let i = 0; i < formSchema.length; i++) {
    _formData[formSchema[i].name] = '';

    if (formSchema[i].type === 'text') {
      _validationSchema[formSchema[i].name] = Yup.string()
        .min(2, `Value must be between 2 and 50 characters`)
        .max(50, 'Value must be between 2 and 50 characters');
    } else if (formSchema[i].type === 'email') {
      _validationSchema[formSchema[i].name] = Yup.string().email(
        'Please enter a valid email'
      );
    }
    if (formSchema[i].required) {
      _validationSchema[formSchema[i].name] = _validationSchema[
        formSchema[i].name
      ].required('Ths field is required');
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
              ({ type, placeholder, name, required }: IFormField) => (
                <FormField
                  key={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.start}
                  required={required}
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
