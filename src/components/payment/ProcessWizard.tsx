import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { decreasePaymentStepCustom } from '../../store/payment/actions';

const ProcessWizard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { step } = appSelector((state) => state.payment);
  const [firstProcess, setFirstProcess] = useState<string>('disabled');
  const [secondProcess, setSecondProcess] = useState<string>('disabled');
  const [thirdProcess, setThirdProcess] = useState<string>('disabled');
  const [fourthProcess, setFourthProcess] = useState<string>('disabled');
  const { t } = useTranslation();

  const href = '#';

  useEffect(() => {
    switch (step) {
      case 1:
        if (step === 1) {
          setFirstProcess('active');
          setSecondProcess('disabled');
          setThirdProcess('disabled');
          setFourthProcess('disabled');
        } else if (step > 2) {
          setFirstProcess('complete');
          setSecondProcess('active');
          setThirdProcess('disabled');
          setFourthProcess('disabled');
        }
        break;
      case 2:
        if (step === 2) {
          setFirstProcess('complete');
          setSecondProcess('active');
          setThirdProcess('disabled');
          setFourthProcess('disabled');
        } else if (step < 2) {
          setFirstProcess('active');
          setSecondProcess('disabled');
          setThirdProcess('disabled');
          setFourthProcess('disabled');
        } else if (step > 2) {
          setFirstProcess('complete');
          setSecondProcess('complete');
          setThirdProcess('active');
          setFourthProcess('disabled');
        }
        break;
      case 3:
        if (step === 3) {
          setFirstProcess('complete');
          setSecondProcess('complete');
          setThirdProcess('active');
          setFourthProcess('disabled');
        } else if (step < 3) {
          setFirstProcess('complete');
          setSecondProcess('active');
          setThirdProcess('disabled');
          setFourthProcess('disabled');
        } else if (step > 3) {
          setThirdProcess('complete');
          setFourthProcess('disabled');
        }
        break;
      case 4:
        if (step === 4) {
          setFirstProcess('complete');
          setSecondProcess('complete');
          setThirdProcess('complete');
          setFourthProcess('active');
        } else if (step < 4) {
          setFirstProcess('complete');
          setSecondProcess('complete');
          setThirdProcess('active');
          setFourthProcess('disabled');
        }
        break;
    }
  }, [step]);

  const previousStep = (position: number): void => {
    if (position === step) {
      return;
    } else if (position > step) {
      return;
    } else if (position < step) {
      dispatch(decreasePaymentStepCustom(position));
    }
  };

  return (
    <div className="bs-wizard row justify-content-center">
      <div className={`col-sm-2 bs-wizard-step text-center ${firstProcess}`}>
        <div className="progress">
          <div className="progress-bar"></div>
        </div>
        <Link
          className="bs-wizard-dot"
          onClick={() => previousStep(1)}
          style={{ cursor: 'pointer' }}
          to={href}
        ></Link>
        <div className="bs-wizard-info text-center">
          {t('wizard.payment-type')}
        </div>
      </div>
      <div className={`col-sm-2 bs-wizard-step text-center ${secondProcess}`}>
        <div className="progress">
          <div className="progress-bar"></div>
        </div>
        <Link
          className="bs-wizard-dot"
          onClick={() => previousStep(3)}
          style={{ cursor: 'pointer' }}
          to={href}
        ></Link>
        <div className="bs-wizard-info text-center">{t('wizard.details')}</div>
      </div>
      <div className={`col-sm-2 bs-wizard-step text-center ${thirdProcess}`}>
        <div className="progress">
          <div className="progress-bar"></div>
        </div>
        <Link
          className="bs-wizard-dot"
          onClick={() => previousStep(4)}
          style={{ cursor: 'pointer' }}
          to={href}
        ></Link>
        <div className="bs-wizard-info text-center">{t('wizard.summary')}</div>
      </div>
      <div className={`col-sm-2 bs-wizard-step text-center ${fourthProcess}`}>
        <div className="progress">
          <div className="progress-bar"></div>
        </div>
        <Link
          className="bs-wizard-dot"
          onClick={() => previousStep(5)}
          style={{ cursor: 'pointer' }}
          to={href}
        ></Link>
        <div className="bs-wizard-info text-center">{t('wizard.pay')}</div>
      </div>
    </div>
  );
};

export { ProcessWizard };
