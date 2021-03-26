import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useTranslation } from 'react-i18next';
import { SmallIcon } from '../common/Styles';
import { Spinner } from '../common/Spinner';
import { SpinnerContainer } from '../auth/Styles';
import { MPESAPaymentContainer, FormBoxInput, ImageBox } from './Style';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../helpers/appDispatch';
import {
  resetTransaction,
  setRepeatTransaction,
  flushCategories,
  fetchCategories,
} from '../../store/payment';
import { path } from '../../helpers/path';
import { mobileWallets } from '../../images/Images';

interface MPESAProps {
  title?: string;
}

export const MPESA: React.FC<MPESAProps> = ({ title }) => {
  const dispatch: AppDispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const { t } = useTranslation();
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onCancel = (): void => {
    dispatch(resetTransaction());
    dispatch(setRepeatTransaction(false));
    history.push(path.payment);
  };

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const setPhoneNumber = (e: string) => {
    setPhone(e);
  };

  const onClickBack = () => {
    window.history.back();
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="container">
        <div className="row justify-content-center">
          <div className="mpesa-container">
            <h4>Payment Information</h4>
            <form onSubmit={onSubmit} className="mt-4">
              <FormBoxInput>
                <select
                  name="payment-type"
                  className="form-control form-control-mpesa"
                >
                  <option value="mpesa">MPESA</option>
                </select>
              </FormBoxInput>

              <FormBoxInput>
                <PhoneInput
                  placeholder="Your phone number ..."
                  value={phone}
                  country="cd"
                  preferredCountries={['cd', 'gh', 'us', 'gb']}
                  onChange={setPhoneNumber}
                  containerStyle={{ marginBottom: '0.8rem' }}
                  inputStyle={{
                    border: '1px solid #fbd5c7',
                    padding: '1.5rem 2.5rem 1.5rem 3.5rem',
                    fontSize: ' 1.2rem',
                    backgroundColor: ' #fff',
                    height: '4rem',
                    display: 'block',
                    width: '100%',
                    fontWeight: 400,
                    lineHeight: '1.5',
                    color: '#495057',
                  }}
                  buttonStyle={{
                    border: 'none',
                    background: 'transparent',
                    padding: '0.2rem 1rem',
                    borderRadius: '0',
                  }}
                  dropdownStyle={{
                    textAlign: 'left',
                    fontSize: '0.8rem',
                    fontWeight: 'normal',
                  }}
                  inputProps={{ required: true }}
                />
              </FormBoxInput>
              <div className="mpesa-btns">
                <button
                  type="button"
                  className="btn"
                  onClick={() => onClickBack()}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={onSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      Confirming..
                      <SmallIcon className="fa fa-spinner fa-spin fa-3x fa-fw"></SmallIcon>
                      <span className="sr-only">Loading...</span>
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
            <ImageBox>
              <img src={mobileWallets} alt="Pay with mobile wallet" />
            </ImageBox>
          </div>
          {/* <div className="redirecting-container col-6">
            <MPESAPaymentContainer>
              <h2>Completed payment?</h2>
              <p>
                Follow the steps on the prompt on your mobile screen to complete
                the transaction. Once completed, click on the orange button
                below to confirm payment.
              </p>
              <div className="btn-container">
                <button className="btn cancel-btn" onClick={() => onCancel()}>
                  Cancel
                </button>
                <button className="btn success-btn">Completed</button>
              </div>
            </MPESAPaymentContainer>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};
