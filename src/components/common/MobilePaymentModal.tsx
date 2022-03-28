import React from 'react'
import { Modal } from 'react-bootstrap'
import { ModalBoxLeft, ModalBoxRight, ProcessingContainer } from './Styles'
import { paymentIcon, mobileWallets } from '../../images/Images'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Spinner } from './Spinner'
import { SmallIcon } from '../auth/Styles'
import { getCurrency } from '../../helpers/functions'
import { Currency } from 'src/interfaces'
import { Error } from './Error'

interface MobilePaymentModalProps {
  show: boolean
  onClose(): void
  onSubmit(e: React.FormEvent<EventTarget>): void
  setPhone(value: string): void
  setProvider(value: React.FormEvent<EventTarget>): void
  success: boolean
  error: any
  isSubmit: boolean
  data: any
  phone: string
  providers: string[]
  currencies: Currency[]
}

export const MobilePaymentModal: React.FC<MobilePaymentModalProps> = ({
  show,
  onClose,
  onSubmit,
  setPhone,
  setProvider,
  phone,
  providers,
  data,
  success,
  error,
  isSubmit,
  currencies
}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modal-box">
        <ModalBoxLeft>
          <h4>Pay with</h4>
          <div className="option">
            <img src={paymentIcon} alt="icon" />
            <h6>Mobile Money</h6>
            <div className="indicator"></div>
          </div>
        </ModalBoxLeft>
        <ModalBoxRight closeButton className="modal-head">
          <div className="header">
            <h4>Pay</h4>
            <h2>
              {getCurrency(currencies, data.data.Currency)} {data.data.Amount}
            </h2>
          </div>
          <div className="body">
            <img src={mobileWallets} alt="logo" width="300" height="200" />
            {!success ? (
              <React.Fragment>
                <h4>
                  Enter your mobile money number and provider to start the
                  payment
                </h4>
                <div className="pay-form">
                  {error ? <Error error="Error" /> : null}
                  <form onSubmit={onSubmit}>
                    <PhoneInput
                      placeholder="050 000 0000"
                      country="cd"
                      inputClass="phone"
                      buttonClass="btnflag"
                      dropdownClass="dropdown-btn"
                      value={phone}
                      inputProps={{ name: 'phone', required: true }}
                      onChange={setPhone}
                    />
                    <select
                      name="provider"
                      className="select"
                      required
                      onChange={setProvider}
                    >
                      <option value="">Choose Provider</option>
                      {providers.map((provider) => (
                        <option key={provider} value={provider}>
                          {provider}
                        </option>
                      ))}
                      {/* <option value="MPESA">MPESA</option> */}
                    </select>
                    <button type="submit" className="btn" disabled={isSubmit}>
                      {isSubmit ? (
                        <React.Fragment>
                          <SmallIcon className="fa fa-spinner fa-spin fa-3x fa-fw"></SmallIcon>
                          <span className="sr-only">Loading...</span>
                        </React.Fragment>
                      ) : null}
                      Confirm
                    </button>
                  </form>
                </div>
              </React.Fragment>
            ) : (
              <div className="container">
                <div className="row justify-content-center">
                  <ProcessingContainer>
                    <Spinner />
                  </ProcessingContainer>
                  <h4>Complete the payment on your phone. We are waiting...</h4>
                </div>
              </div>
            )}
          </div>
        </ModalBoxRight>
      </Modal.Body>
    </Modal>
  )
}
