import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { appSelector } from '../helpers/appSelector'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { Layout } from '../components/home/Layout'
import {
  fetchCategories,
  resetTransaction,
  flushCategories
} from '../store/payment'
import { getCurrencies } from '../store/dashboard'
import { clearAuthState } from '../store/auth'
import { slider } from '../helpers/slider'
import { isEmpty } from 'src/helpers/isEmpty'

const IndexPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { categories } = appSelector((state) => state.payment)
  const { currencies } = appSelector((state) => state.dashboard)

  useEffect(() => {
    dispatch(resetTransaction())
    dispatch(clearAuthState())
    if (!isEmpty(categories)) {
      dispatch(flushCategories())
      dispatch(fetchCategories())
    } else {
      dispatch(fetchCategories())
    }
    if (!isEmpty(currencies)) {
      dispatch(getCurrencies())
    }
    slider()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Layout title="Araka | Payment Platform" />
}

export default withRouter(IndexPage)
