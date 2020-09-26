import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { decreasePaymentStep } from '../../store/payment/actions';

const ProcessWizard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { step } = appSelector((state) => state.payment);
  const [firstProcess, setFirstProcess] = useState<string>('disabled');
  const [secondProcess, setSecondProcess] = useState<string>('disabled');
  const [thirdProcess, setThirdProcess] = useState<string>('disabled');
  const [fourthProcess, setFourthProcess] = useState<string>('disabled');
  const [fifthProcess, setFifthProcess] = useState<string>('disabled');

  const href = '#';

  useEffect(() => {
    switch (step) {
      case 1:
        if (step === 1) {
          setFirstProcess('active');
          setSecondProcess('disabled');
          setThirdProcess('disabled');
          setFourthProcess('disabled');
          setFifthProcess('disabled');
        } else if (step > 2) {
          setFirstProcess('complete');
          setSecondProcess('disabled');
          setThirdProcess('disabled');
          setFourthProcess('disabled');
          setFifthProcess('disabled');
        }
        break;
      case 2:
        if (step === 2) {
          setFirstProcess('complete');
          setSecondProcess('active');
          setThirdProcess('disabled');
          setFourthProcess('disabled');
          setFifthProcess('disabled');
        } else if (step < 2) {
          setFirstProcess('active');
          setSecondProcess('disabled');
          setThirdProcess('disabled');
          setFourthProcess('disabled');
          setFifthProcess('disabled');
        } else if (step > 2) {
          setFirstProcess('complete');
          setSecondProcess('complete');
          setThirdProcess('disabled');
          setFourthProcess('disabled');
          setFifthProcess('disabled');
        }
        break;
      case 3:
        if (step === 3) {
          setFirstProcess('complete');
          setSecondProcess('complete');
          setThirdProcess('active');
          setFourthProcess('disabled');
          setFifthProcess('disabled');
        } else if (step < 3) {
          setFirstProcess('complete');
          setSecondProcess('active');
          setThirdProcess('disabled');
          setFourthProcess('disabled');
          setFifthProcess('disabled');
        } else if (step > 3) {
          setThirdProcess('complete');
          setFourthProcess('disabled');
          setFifthProcess('disabled');
        }
        break;
      case 4:
        if (step === 4) {
          setFirstProcess('complete');
          setSecondProcess('complete');
          setThirdProcess('complete');
          setFourthProcess('active');
          setFifthProcess('disabled');
        } else if (step < 4) {
          setFirstProcess('complete');
          setSecondProcess('complete');
          setThirdProcess('active');
          setFourthProcess('disabled');
          setFifthProcess('disabled');
        } else if (step > 4) {
          setFirstProcess('complete');
          setSecondProcess('complete');
          setThirdProcess('complete');
          setFourthProcess('complete');
          setFifthProcess('disabled');
        }
        break;
      case 5:
        if (step === 5) {
          setFirstProcess('complete');
          setSecondProcess('complete');
          setThirdProcess('complete');
          setFourthProcess('complete');
          setFifthProcess('active');
        } else if (step < 5) {
          setFirstProcess('complete');
          setSecondProcess('complete');
          setThirdProcess('complete');
          setFourthProcess('active');
          setFifthProcess('disabled');
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
      dispatch(decreasePaymentStep(position));
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
        <div className="bs-wizard-info text-center">Payment Type</div>
      </div>
      <div className={`col-sm-2 bs-wizard-step text-center ${secondProcess}`}>
        <div className="progress">
          <div className="progress-bar"></div>
        </div>
        <Link
          className="bs-wizard-dot"
          onClick={() => previousStep(2)}
          style={{ cursor: 'pointer' }}
          to={href}
        ></Link>
        <div className="bs-wizard-info text-center">Provider</div>
      </div>
      <div className={`col-sm-2 bs-wizard-step text-center ${thirdProcess}`}>
        <div className="progress">
          <div className="progress-bar"></div>
        </div>
        <Link
          className="bs-wizard-dot"
          onClick={() => previousStep(3)}
          style={{ cursor: 'pointer' }}
          to={href}
        ></Link>
        <div className="bs-wizard-info text-center">Details</div>
      </div>
      <div className={`col-sm-2 bs-wizard-step text-center ${fourthProcess}`}>
        <div className="progress">
          <div className="progress-bar"></div>
        </div>
        <Link
          className="bs-wizard-dot"
          onClick={() => previousStep(4)}
          style={{ cursor: 'pointer' }}
          to={href}
        ></Link>
        <div className="bs-wizard-info text-center">Summary</div>
      </div>
      <div className={`col-sm-2 bs-wizard-step text-center ${fifthProcess}`}>
        <div className="progress">
          <div className="progress-bar"></div>
        </div>
        <Link
          className="bs-wizard-dot"
          onClick={() => previousStep(5)}
          style={{ cursor: 'pointer' }}
          to={href}
        ></Link>
        <div className="bs-wizard-info text-center">Pay</div>
      </div>
    </div>
  );
};

export { ProcessWizard };
