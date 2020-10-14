import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Toolbar } from './Toolbar';
import { Spinner } from '../common/Spinner';
import { modalTypes } from '../../helpers/constants';
import { ModalContainer } from '../common/ModalContainer';
import { Beneficiary } from '../../interfaces';
import { RecipientForm } from './RecipientForm';
import {
  addBeneficiaryRequest,
  getBeneficiaries,
  clearAddBeneficiarySuccessFailure,
} from '../../store/dashboard';
import { isEmpty } from 'src/helpers/isEmpty';
import { toast } from 'src/helpers/toaster';
import { Recipient } from './Recipient';
// import { BeneficiaryPagination } from './BeneficiaryPagination';
import { EmptyRecipient } from './EmptyRecipient';

export const Recipients: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = appSelector((state) => state.auth);
  const {
    isAddingBeneficiary,
    beneficiaryLoading,
    beneficiaries,
    addBeneficiarySuccess,
    addBeneficiaryError,
  } = appSelector((state) => state.dashboard);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [values, setValues] = useState<Beneficiary>({
    name: '',
    phoneNumber: '',
    studentId: '',
    email: '',
    bankAccount: '',
    additionalInfo: '',
    userId: user!.userId,
  });
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(beneficiaryLoading);
  const [recipients, setRecipients] = useState<Beneficiary[]>([]);

  useEffect(() => {
    if (user !== undefined && isEmpty(beneficiaries)) {
      dispatch(getBeneficiaries(user.userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e: React.FormEvent<EventTarget>): void => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setValues({ ...values, [name]: value });
  };

  const setPhoneNumber = (e: string): void => {
    setPhone(e);
  };

  const onShowModalClick = (type: string): void => {
    setShowModal(true);
    setModalType(type);
  };

  const onCloseModal = (): void => {
    setShowModal(false);
    setModalType('');
    dispatch(clearAddBeneficiarySuccessFailure());
  };

  const onSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    if (
      isEmpty(values.name) ||
      isEmpty(phone) ||
      (isEmpty(values.studentId) && isEmpty(values.bankAccount))
    ) {
      toast(
        'Name, phone number, and student id or bank account number are required',
        false
      );
    } else {
      const payload: Beneficiary = {
        name: values.name,
        phoneNumber: phone,
        studentId: values.studentId,
        email: values.email,
        bankAccount: values.bankAccount,
        additionalInfo: values.additionalInfo,
        userId: values.userId,
      };
      dispatch(addBeneficiaryRequest(payload));
    }
  };

  useEffect(() => {
    setLoading(beneficiaryLoading);
    setRecipients(beneficiaries);
    setIsSubmitting(isAddingBeneficiary);
    if (addBeneficiarySuccess) {
      toast('Beneficiary added successfully', true);
    } else if (addBeneficiaryError) {
      toast('An error occured', false);
    }
  }, [
    isAddingBeneficiary,
    beneficiaryLoading,
    beneficiaries,
    addBeneficiarySuccess,
    addBeneficiaryError,
  ]);

  return (
    <React.Fragment>
      <Toolbar onShowModalClick={onShowModalClick} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="contact-header">
              <h2>Beneficiaries</h2>
            </div>
            <div className="contacts-container">
              {loading ? (
                <Spinner />
              ) : (
                <React.Fragment>
                  {isEmpty(recipients) ? (
                    <EmptyRecipient message="No beneficiary has been added" />
                  ) : (
                    <React.Fragment>
                      {recipients.map((r) =>
                        !isEmpty(r.name) ? (
                          <Recipient recipient={r} key={r.beneficiaryId} />
                        ) : null
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>
            {/*  */}
          </div>
        </div>
      )}
      {showModal && modalType === modalTypes.ADD_BENEFICIARY ? (
        <ModalContainer
          show={showModal}
          onClose={onCloseModal}
          header="Add Beneficiary"
        >
          <RecipientForm
            btnTitle="Add Recipient"
            loading={isSubmitting}
            onChange={onChange}
            phone={phone}
            setPhoneNumber={setPhoneNumber}
            values={values}
            onSubmit={onSubmit}
          />
        </ModalContainer>
      ) : null}
    </React.Fragment>
  );
};
