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
  clearSomeBooleans,
} from '../../store/dashboard';
import { isEmpty } from 'src/helpers/isEmpty';
import { Beneficiaries } from './Beneficiaries';
import { EmptyRecipient } from './EmptyRecipient';

export const Recipients: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = appSelector((state) => state.auth);
  const {
    isAddingBeneficiary,
    beneficiaryLoading,
    beneficiaries,
    addBeneficiarySuccess,
  } = appSelector((state) => state.dashboard);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [values, setValues] = useState<Beneficiary>({
    beneficiaryId: 0,
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
  const [recipients, setRecipients] = useState<Beneficiary[]>(beneficiaries);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [defaultBeneficiaries, setDefaultBeneficiaries] = useState<
    Beneficiary[]
  >(beneficiaries);
  const [message, setMessage] = useState<string>(
    'No beneficiary has been added'
  );

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
  };

  const onSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();

    const payload: Beneficiary = {
      beneficiaryId: 0,
      name: values.name,
      phoneNumber: phone,
      studentId: values.studentId,
      email: values.email,
      bankAccount: values.bankAccount,
      additionalInfo: values.additionalInfo,
      userId: values.userId,
    };
    dispatch(addBeneficiaryRequest(payload));
  };

  useEffect(() => {
    setLoading(beneficiaryLoading);
    setRecipients(beneficiaries);
    setDefaultBeneficiaries(beneficiaries);
    setIsSubmitting(isAddingBeneficiary);
    setIsSuccess(addBeneficiarySuccess);
    setTimeout(() => dispatch(clearSomeBooleans()), 5000);
  }, [
    isAddingBeneficiary,
    beneficiaryLoading,
    beneficiaries,
    addBeneficiarySuccess,
    dispatch,
  ]);

  const onSearch = (e: React.FormEvent<EventTarget>): void => {
    const { value } = e.target as HTMLTextAreaElement;
    let filteredList: Beneficiary[] = [];
    if (value !== '') {
      filteredList = recipients.filter((beneficiary) => {
        const lowerCase = beneficiary.name.toLowerCase();
        const filter = value.toLowerCase();
        return lowerCase.includes(filter);
      });
      if (isEmpty(filteredList)) {
        setMessage('The name you have entered cannot be found');
      }
    } else {
      filteredList = defaultBeneficiaries;
    }
    setRecipients(filteredList);
  };

  return (
    <React.Fragment>
      <Toolbar onShowModalClick={onShowModalClick} onSearch={onSearch} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="contact-header">
              <h2>Beneficiaries</h2>
            </div>
            <React.Fragment>
              {loading ? (
                <Spinner />
              ) : (
                <React.Fragment>
                  {isEmpty(recipients) && recipients !== [] ? (
                    <EmptyRecipient message={message} />
                  ) : (
                    <Beneficiaries beneficiaries={recipients} />
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
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
            btnTitle="Add Beneficiary"
            loading={isSubmitting}
            onChange={onChange}
            phone={phone}
            setPhoneNumber={setPhoneNumber}
            values={values}
            onSubmit={onSubmit}
            isSuccess={isSuccess}
            btnIcon="fa-plus"
            message="Beneficiary added successfully"
          />
        </ModalContainer>
      ) : null}
    </React.Fragment>
  );
};
