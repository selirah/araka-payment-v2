import React from 'react'
import { withRouter, useLocation } from 'react-router-dom'
import { ResetPasswordForm } from '../../components/auth/ResetPasswordForm'

const ResetPasswordPage: React.FC = () => {
  const query = new URLSearchParams(useLocation().search)
  const processId = query.get('PID')
  return (
    <React.Fragment>
      <ResetPasswordForm processId={processId} />
    </React.Fragment>
  )
}

export default withRouter(ResetPasswordPage)
