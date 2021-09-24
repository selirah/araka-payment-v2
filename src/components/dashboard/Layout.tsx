import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { appSelector } from '../../helpers/appSelector'
import { AppDispatch } from '../../helpers/appDispatch'
import { SideBar } from './SideBar'
import { TopNav } from './TopNav'
import { ContentContainer } from './ContentContainer'
import { NewUser } from './NewUser'
import { Content } from './Content'
import { Account } from './Account'
import { EditAccount } from './EditAccount'
import { Recipients } from './Recipients'
import { pageTypes } from '../../helpers/constants'
import { Spinner } from '../common/Spinner'
import { isEmpty } from 'src/helpers/isEmpty'
import {
  setRepeatTransaction,
  fetchCategories,
  clearMobileStates,
  resetTransaction
} from '../../store/payment'
import { TransactionHistory } from '../../interfaces'

type Props = {
  title?: string
  refresh(): void
}

export const Layout: React.FC<Props> = ({ title, refresh }) => {
  const dispatch: AppDispatch = useDispatch()
  const { pageSwitch, transactions, loading, editAccount } = appSelector(
    (state) => state.dashboard
  )
  const { categories } = appSelector((state) => state.payment)
  const [page, setPage] = useState<string>(pageSwitch)
  const [transactionData, setTransactionData] =
    useState<TransactionHistory[]>(transactions)
  const [spinner, setSpinner] = useState<boolean>(loading)

  useEffect(() => {
    dispatch(setRepeatTransaction(false))
    dispatch(clearMobileStates())
    dispatch(resetTransaction())
    if (isEmpty(categories)) {
      dispatch(fetchCategories())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setPage(pageSwitch)
    setSpinner(loading)
    setTransactionData(transactions)
  }, [pageSwitch, loading, transactions])

  let render: React.ReactNode

  switch (page) {
    case pageTypes.HOME:
      if (spinner && isEmpty(transactionData)) {
        render = <Spinner />
      } else if (!spinner && isEmpty(transactionData)) {
        render = <NewUser />
      } else {
        render = <Content transactions={transactionData} refresh={refresh} />
      }
      break
    case pageTypes.ACCOUNT:
      if (!editAccount) {
        render = <Account />
      } else {
        render = <EditAccount />
      }
      break
    case pageTypes.RECIPIENTS:
      render = <Recipients />
      break
    default:
      if (spinner && isEmpty(transactionData)) {
        render = <Spinner />
      } else if (!spinner && isEmpty(transactionData)) {
        render = <NewUser />
      } else {
        render = <Content transactions={transactionData} refresh={refresh} />
      }
      break
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
            <div className="container-fluid dashboard-content">
              <ContentContainer>{render}</ContentContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
