import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from '../../helpers/appDispatch';
import { TransactionHistory } from '../../interfaces';
import { appSelector } from '../../helpers/appSelector';
import {
  getCurrency,
  // getCategoryName,
  // getProductName,
  getCategory,
  getProduct,
} from '../../helpers/functions';
import {
  increasePaymentStepCustom,
  setCategory,
  setProduct,
  setRepeatTransaction,
  setTransaction,
} from '../../store/payment';
import { downloadReceiptRequest } from '../../store/dashboard';
import moment from 'moment';
import { secure } from '../../utils/secure';
import { path } from '../../helpers/path';
import { transactionStatus } from '../../helpers/constants';

interface TransHistoryProps {
  transaction: TransactionHistory;
}

export const TransHistory: React.FC<TransHistoryProps> = ({ transaction }) => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const { currencies, isRequestingDownload } = appSelector(
    (state) => state.dashboard
  );
  const { categories } = appSelector((state) => state.payment);
  const { t } = useTranslation();
  // const { productCategoryId, productId } = transaction.transactionDetails.data;
  const { Currency } = transaction.transactionDetails.data;
  const {
    transactionId,
    transactionDescription,
    createdAt,
    amountPaid,
    vat,
    charge,
    status,
  } = transaction;
  const [loading, setLoading] = useState<boolean>(false);

  const onRepeatTransactionClick = (transaction: TransactionHistory): void => {
    // update states and send user to summary page
    const {
      productCategoryId,
      productId,
    } = transaction.transactionDetails.data;
    dispatch(setCategory(getCategory(categories, productCategoryId)));
    dispatch(setProduct(getProduct(categories, productCategoryId, productId)));
    dispatch(setTransaction(transaction));
    dispatch(increasePaymentStepCustom(4));
    dispatch(setRepeatTransaction(true));
    delete transaction.transactionDetails.data.productCategoryId;
    delete transaction.transactionDetails.data.productId;
    secure.set('orderData', transaction.transactionDetails);
    history.push(path.payment);
  };

  const setColor = (status: string): string => {
    let color: string = '#506077';
    switch (status) {
      case transactionStatus.APPROVED:
        color = '#4bb543';
        break;
      case transactionStatus.DECLINED:
        color = '#d8000c';
        break;
      case transactionStatus.CANCELLED:
        color = '#506077';
        break;
    }
    return color;
  };

  useEffect(() => {
    setLoading(isRequestingDownload);
  }, [isRequestingDownload]);

  const onDownloadReceiptClick = (transactionId: number): void => {
    dispatch(downloadReceiptRequest(transactionId));
  };

  const href = '#';
  return (
    <div className="card">
      <div className="card-header p-0" id={`headingOne${transactionId}`}>
        <div className="row">
          <div className="col-12 col-md-2 data py-3">
            {moment(createdAt, 'MM/DD/YYYY HH:mm:ss').format('DD/MM/YYYY')}
          </div>
          <div className="col-12 col-md-2 data py-3">{transactionId}</div>
          <div className="col-12 col-md-3 data py-3 text-left">
            {transactionDescription.replace(/([a-z])([A-Z])/g, '$1 $2')}
          </div>
          <div className="col-12 col-md-2 data py-3">
            <span style={{ color: `${setColor(status)}` }}>
              {getCurrency(currencies, Currency)} {amountPaid.toFixed(2)}
            </span>
          </div>
          <div className="col-12 col-md-2 data py-3">
            <span style={{ color: `${setColor(status)}` }}>{status}</span>
          </div>
          <div className="col-12 col-md-1 data py-3">
            <a
              href={href}
              className="btn-header-link"
              data-toggle="collapse"
              data-target={`#collapseOne${transactionId}`}
              aria-expanded="true"
              aria-controls={`collapseOne${transactionId}`}
            >
              <i className="fa fa-plus"></i>
            </a>
          </div>
        </div>
      </div>
      <div
        id={`collapseOne${transactionId}`}
        className="collapse"
        aria-labelledby={`headingOne${transactionId}`}
        data-parent="#accordionExample"
      >
        <div className="card-body">
          <div className="transaction-details">
            <h2>{t('dashboard.old-user.transaction-details')}</h2>

            <div className="receipt">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>You sent</td>
                    <td>
                      {getCurrency(currencies, Currency)}{' '}
                      {amountPaid.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>As</td>
                    <td>
                      {transactionDescription.replace(
                        /([a-z])([A-Z])/g,
                        '$1 $2'
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Our Charge</td>
                    <td>
                      {getCurrency(currencies, Currency)} {charge.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>VAT</td>
                    <td>
                      {getCurrency(currencies, Currency)} {vat.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>Transaction ID</td>
                    <td># {transactionId}</td>
                  </tr>
                  <tr>
                    <td>Status of Transaction</td>
                    <td style={{ color: `${setColor(status)}` }}>{status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="receipt-buttons">
              <button
                className="btn"
                onClick={() => onDownloadReceiptClick(transactionId)}
              >
                <i
                  className={`fa ${
                    !loading ? 'fa-download' : 'fa-spinner fa-spin'
                  }`}
                ></i>{' '}
                Download Receipt
              </button>
              <button
                className="btn"
                onClick={() => onRepeatTransactionClick(transaction)}
              >
                Repeat this transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
