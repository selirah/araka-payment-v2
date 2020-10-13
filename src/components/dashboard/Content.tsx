import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from './Search';
import { appSelector } from '../../helpers/appSelector';
import { TransactionHistory } from '../../interfaces';
import { TransHistory } from './TransHistory';
import { isEmpty } from 'src/helpers/isEmpty';
import { Spinner } from '../common/Spinner';

interface ContentProps {
  transactions: TransactionHistory[];
  refresh(): void;
}

const Content: React.FC<ContentProps> = ({ transactions, refresh }) => {
  const { loading } = appSelector((state) => state.dashboard);
  const { t } = useTranslation();

  return (
    <div className="row">
      <div className="col-12">
        <div className="top-pane">
          <h2>{t('dashboard.old-user.activity')}</h2>
          <Search />
        </div>
        <div className="middle-pane">
          <h2>Transaction History</h2>
          <button className="btn" onClick={() => refresh()}>
            <i className={`fa fa-refresh ${loading ? 'fa-spin' : null}`}></i>{' '}
            Refresh
          </button>
        </div>
        <div className="transaction-content">
          {loading ? (
            <Spinner />
          ) : (
            <div className="accordion" id="accordionExample">
              {transactions.map((transaction) =>
                !isEmpty(transaction.transactionDetails.data) &&
                !isEmpty(
                  transaction.transactionDetails.data.productCategoryId
                ) ? (
                  <TransHistory
                    transaction={transaction}
                    key={transaction.transactionId}
                  />
                ) : null
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Content };
