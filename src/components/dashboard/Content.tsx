import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search } from './Search';
import { appSelector } from '../../helpers/appSelector';
import { TransactionHistory, Category } from '../../interfaces';
import { TransHistory } from './TransHistory';
import { isEmpty } from 'src/helpers/isEmpty';
import { Spinner } from '../common/Spinner';
import {
  filterCategories,
  filterCategoriesById,
} from '../../helpers/functions';
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
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);
  const [defaultCategories] = useState<Category[]>(categories);
  const [cats, setCats] = useState<Category[]>(categories);

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

  // const dropDownRef = React.createRef();
  const dropDownList = (): void => {
    setShowDropDown(!showDropDown);
    setCats(defaultCategories);
  };

  const searchFromDropDown = (id: number): void => {
    setActive(id);
    if (id !== 0) {
      const category: Category | undefined = filterCategoriesById(
        categories,
        id
      );
      if (category !== undefined) {
        let filteredHistory: TransactionHistory[] = [];
        for (let i = 0; i < transactions.length; i++) {
          if (
            transactions[i].transactionDetails.data.productCategoryId ===
            category.productCategoryId
          ) {
            filteredHistory.push(transactions[i]);
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
    setShowDropDown(!showDropDown);
    setCats(defaultCategories);
  };

  const onSearchCategory = (e: React.FormEvent<EventTarget>): void => {
    const { value } = e.target as HTMLTextAreaElement;
    if (value !== '') {
      const cats: Category[] = filterCategories(categories, value);
      if (!isEmpty(cats)) {
        setCats(cats);
      } else {
        setCats([]);
      }
    } else {
      setCats(defaultCategories);
    }
  };

  const paymentOptions = cats.map((c) => (
    <Link
      key={c.productCategoryId}
      to="#"
      onClick={() => searchFromDropDown(c.productCategoryId)}
      className={`${c.productCategoryId === active ? 'active' : null}`}
    >
      {c.name}
    </Link>
  ));

  return (
    <div className="row">
      <div className="col-12">
        <div className="top-pane">
          <h2>{t('dashboard.old-user.activity')}</h2>
          <Search onSearch={onSearch} />
        </div>
        <div className="middle-pane">
          <h2>Transaction History</h2>
          <div className="drop-down">
            <button className="btn btn-filter" onClick={() => dropDownList()}>
              Filter Payment Type{' '}
              <i
                className={`fa ${
                  !showDropDown ? 'fa-caret-down' : 'fa-caret-up'
                }`}
              ></i>
            </button>
            {showDropDown ? (
              <div className="dropdown-content">
                <input
                  type="text"
                  placeholder="Search.."
                  id="myInput"
                  className="search-category"
                  onChange={onSearchCategory}
                />
                <Link
                  key={0}
                  to="#"
                  onClick={() => searchFromDropDown(0)}
                  className={`${0 === active ? 'active' : null}`}
                >
                  All
                </Link>
                {paymentOptions}
              </div>
            ) : null}
          </div>
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
