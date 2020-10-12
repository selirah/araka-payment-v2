import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { SideBar } from './SideBar';
import { TopNav } from './TopNav';
import { ContentContainer } from './ContentContainer';
import { NewUser } from './NewUser';
import { Content } from './Content';
import { Account } from './Account';
import { Recipients } from './Recipients';
import { pageTypes } from '../../helpers/constants';
import { Spinner } from '../common/Spinner';
import { isEmpty } from 'src/helpers/isEmpty';
import { getTransactions } from '../../store/dashboard';
import { setRepeatTransaction, fetchCategories } from '../../store/payment';
import './dashboard.css';

type Props = {
  title?: string;
};

export const Layout: React.FC<Props> = ({ title }) => {
  const dispatch: AppDispatch = useDispatch();
  const { pageSwitch, transactions, loading } = appSelector(
    (state) => state.dashboard
  );
  const { categories } = appSelector(
    (state) => state.payment
  );
  const [page, setPage] = useState<string>(pageSwitch);
  const [transactionData, setTransactionData] = useState<any[]>(transactions);
  const [spinner, setSpinner] = useState<boolean>(loading);

  const refresh = (): void => {
    dispatch(getTransactions());
  }

  useEffect(() => {
   refresh();
   dispatch(setRepeatTransaction(false));
   if (isEmpty(categories)) {
     dispatch(fetchCategories());
   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(pageSwitch);
    setSpinner(loading);
    setTransactionData(transactions);
  }, [pageSwitch, loading, transactions]);

  let render: React.ReactNode;

  switch (page) {
    case pageTypes.HOME:
      if (spinner && isEmpty(transactionData)) {
        render = <Spinner />;
      } else if (!spinner && isEmpty(transactionData)) {
        render = <NewUser />;
      } else {
        render = <Content transactions={transactionData} refresh={refresh} />;
      }
      break;
    case pageTypes.ACCOUNT:
      render = <Account />;
      break;
    case pageTypes.RECIPIENTS:
      render = <Recipients />;
      break;
    default:
      if (spinner && isEmpty(transactionData)) {
        render = <Spinner />;
      } else if (!spinner && isEmpty(transactionData)) {
        render = <NewUser />;
      } else {
        render = <Content transactions={transactionData} refresh={refresh} />;
      }
      break;
  }

  return (
    <section id="page-top">
      <div id="wrapper">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <SideBar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopNav />
            <div className="container-fluid">
              <ContentContainer>
                {render}
              </ContentContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
