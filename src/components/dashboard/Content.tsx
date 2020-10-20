import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from './Search';
import { appSelector } from '../../helpers/appSelector';
import { TransactionHistory, Category } from '../../interfaces';
import { TransHistory } from './TransHistory';
import { isEmpty } from 'src/helpers/isEmpty';
import { Spinner } from '../common/Spinner';
import { filterCategories } from '../../helpers/functions';
import { EmptyTransaction } from './EmptyTransaction';

interface ContentProps {
  transactions: TransactionHistory[];
  refresh(): void;
}

const Content: React.FC<ContentProps> = ({ transactions, refresh }) => {
  const { loading } = appSelector((state) => state.dashboard);
  const { categories } = appSelector((state) => state.payment);
  const { t } = useTranslation();
  const [trans, setTrans] = useState<TransactionHistory[]>(transactions);
  const [defaultTransactions] = useState<TransactionHistory[]>(transactions);

  const onSearch = (e: React.FormEvent<EventTarget>): void => {
    const { value } = e.target as HTMLTextAreaElement;
    if (value !== '') {
      const cats: Category[] = filterCategories(categories, value);
      if (!isEmpty(cats)) {
        let filteredHistory: TransactionHistory[] = [];
        for (let i = 0; i < transactions.length; i++) {
          for (let j = 0; j < cats.length; j++) {
            if (
              transactions[i].transactionDetails.data.productCategoryId ===
              cats[j].productCategoryId
            ) {
              filteredHistory.push(transactions[i]);
            }
          }
        }
        if (!isEmpty(filteredHistory)) {
          setTrans(filteredHistory);
        } else {
          setTrans([]);
        }
      } else {
        setTrans([]);
      }
    } else {
      setTrans(defaultTransactions);
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="top-pane">
          <h2>{t('dashboard.old-user.activity')}</h2>
          <Search onSearch={onSearch} />
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
            <React.Fragment>
              {isEmpty(trans) ? (
                <EmptyTransaction />
              ) : (
                <div className="accordion" id="accordionExample">
                  {trans.map((transaction) =>
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
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export { Content };
