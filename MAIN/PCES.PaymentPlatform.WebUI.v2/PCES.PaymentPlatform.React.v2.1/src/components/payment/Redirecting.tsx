import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { resetTransaction, setRepeatTransaction } from '../../store/payment';
import { path } from '../../helpers/path';
import { Spinner } from '../common/Spinner';
import { SpinnerContainer } from '../auth/Styles';

type Props = {
  title?: string;
};

const Redirecting: React.FC<Props> = ({ title }) => {
  const dispatch: AppDispatch = useDispatch();
  const { orderResponse } = appSelector((state) => state.payment);
  const history = useHistory();

  useEffect(() => {
    if (orderResponse !== undefined) {
      const url = orderResponse.order.orderURL;
      dispatch(resetTransaction());
      dispatch(setRepeatTransaction(false));
      setInterval(() => {
        window.location.href = url;
      }, 3000);
    } else {
      history.push(path.home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="container">
        <div className="row justify-content-center">
          <div className="redirecting-container">
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
            <h4>We are redirecting you to checkout page...please wait</h4>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { Redirecting };
