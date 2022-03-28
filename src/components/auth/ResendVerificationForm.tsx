import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { AppDispatch } from '../../helpers/appDispatch'
import { appSelector } from '../../helpers/appSelector'
import {
  resendVerificationRequest,
  resetErrorState
} from '../../store/auth/actions'
import { ChangeLanguage } from '../common/ChangeLanguage'
import { logo } from '../../images/Images'
import { TextInput } from './TextInput'
import { Button } from './Button'
import { ForgottenPassword } from '../../interfaces'
import {
  ContainerFluid,
  ImageContainerLogin,
  FormContainer,
  FormBox,
  FormBoxHeader,
  LogoContainer,
  FormBoxSubHeader,
  TermsContainer
} from './Styles'
import { path } from '../../helpers/path'
import { Success } from '../common/Success'
import { SingleError } from './SingleError'
import ReCAPTCHA from 'react-google-recaptcha'
import { SITE_KEY } from '../../helpers/constants'

const DELAY = 1500

const ResendVerificationForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory()
  const auth = appSelector((state) => state.auth)
  const { t } = useTranslation()
  const [values, setValues] = useState<ForgottenPassword>({
    EmailAddress: ''
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [load, setLoad] = useState(false)
  const [expired, setExpired] = useState(false)
  const reCaptchaRef = useRef<any>()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setErrorMessage('')
    setIsError(false)
    const { isAuthenticated } = auth
    if (isAuthenticated) {
      history.push(path.home)
    }
    dispatch(resetErrorState())
    setTimeout(() => {
      setLoad(true)
    }, DELAY)
    return () => {
      setIsMounted(!isMounted)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChange = (e: React.FormEvent<EventTarget>): void => {
    const { name, value } = e.target as HTMLTextAreaElement
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    setIsError(false)
    setErrorMessage('')
    reCaptchaRef.current
      .executeAsync()
      .then((value: string) => {
        if (value && !expired) {
          const payload: ForgottenPassword = {
            EmailAddress: values.EmailAddress
          }
          setEmail(values.EmailAddress)
          dispatch(resendVerificationRequest(payload))
        }
      })
      .catch((err: any) => {})
  }

  const handleRecaptcha = useCallback((value) => {
    if (value === null) setExpired(true)
  }, [])

  useEffect(() => {
    const {
      isResendVerification,
      resendVericationSuccess,
      resendVericationFailure,
      forgottenError
    } = auth
    // if (resendVericationSuccess) {
    //   setValues({ EmailAddress: '' });
    // }
    setIsSubmitting(isResendVerification)
    setIsSuccess(resendVericationSuccess)
    setIsError(resendVericationFailure)
    setErrorMessage(forgottenError)
  }, [auth])

  return (
    <React.Fragment>
      <ContainerFluid>
        <div className="row">
          <ImageContainerLogin className="col-lg-6 col-md-6 d-none d-md-block"></ImageContainerLogin>
          <FormContainer className="col-lg-6 col-md-6">
            <FormBox className="col-sm-7 text-center">
              <LogoContainer className="mt-0">
                <Link className="navbar-brand" to={path.home}>
                  <img
                    src={logo}
                    height="60"
                    alt="Araka by ProxyPay"
                    title="Araka by ProxyPay"
                  />
                </Link>
              </LogoContainer>
              <FormBoxHeader>
                <h4>Resend verification Link</h4>
              </FormBoxHeader>
              <FormBoxSubHeader>
                <h6>
                  Remembered password? <Link to={path.login}>Log in</Link>
                </h6>
              </FormBoxSubHeader>
              {isSccess ? (
                <Success
                  message={`An email has been sent to '${email}' for further instructions`}
                />
              ) : null}
              {isError ? <SingleError error={errorMessage} /> : null}
              <form onSubmit={onSubmit}>
                <TextInput
                  type="email"
                  name="EmailAddress"
                  value={values.EmailAddress}
                  placeholder="Your email"
                  onChange={onChange}
                  required={true}
                />
                <Button
                  type="submit"
                  title={t('forgotten.btn_title')}
                  isSubmitting={isSubmitting}
                  processTitle={t('forgotten.processing')}
                />
                <TermsContainer className="row">
                  <div className="col-sm-12 text-center mt-2">
                    <h4>
                      By continuing, you accept our{' '}
                      <Link to={path.terms}>Terms of Use</Link> and{' '}
                      <Link to={path.terms}>Privacy Policy</Link>
                    </h4>
                  </div>
                </TermsContainer>
              </form>
              {load && (
                <ReCAPTCHA
                  theme="light"
                  size="invisible"
                  ref={reCaptchaRef}
                  sitekey={`${SITE_KEY}`}
                  onChange={handleRecaptcha}
                />
              )}
            </FormBox>
            <ChangeLanguage />
          </FormContainer>
        </div>
      </ContainerFluid>
    </React.Fragment>
  )
}

export { ResendVerificationForm }
