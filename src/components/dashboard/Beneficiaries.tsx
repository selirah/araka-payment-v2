import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Beneficiary } from '../../interfaces';
import { Recipient } from './Recipient';
import { isEmpty } from '../../helpers/isEmpty';
import { Pagination } from './Pagination';
import { modalTypes } from '../../helpers/constants';
import { ModalContainer } from '../common/ModalContainer';
import { RecipientForm } from './RecipientForm';
import {
  updateBeneficiaryRequest,
  clearSomeBooleans,
} from '../../store/dashboard';

interface BeneficiariesProps {
  beneficiaries: Beneficiary[];
}

export const Beneficiaries: React.FC<BeneficiariesProps> = ({
  beneficiaries,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = appSelector((state) => state.auth);
  const { isUpdatingBeneficiary, updateBeneficiarySuccess } = appSelector(
    (state) => state.dashboard
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage] = useState<number>(10);
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
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  // Get current beneficiaries
  const indexOfLastBeneficiary = currentPage * perPage;
  const indexOfFirstBeneficiary = indexOfLastBeneficiary - perPage;
  const currrentBeneficiaries: Beneficiary[] = beneficiaries.slice(
    indexOfFirstBeneficiary,
    indexOfLastBeneficiary
  );

  const onChange = (e: React.FormEvent<EventTarget>): void => {
    const { name, value } = e.target as HTMLTextAreaElement;
    setValues({ ...values, [name]: value });
  };

  const setPhoneNumber = (e: string): void => {
    setPhone(e);
  };

  const onShowModalClick = (type: string, beneficiary: Beneficiary): void => {
    setShowModal(true);
    setModalType(type);
    setValues({
      beneficiaryId: beneficiary.beneficiaryId,
      name: beneficiary.name,
      phoneNumber: beneficiary.phoneNumber,
      studentId: beneficiary.studentId,
      email: beneficiary.email,
      bankAccount: beneficiary.bankAccount,
      additionalInfo: beneficiary.additionalInfo,
      userId: user!.userId,
    });
    setPhone(
      beneficiary.phoneNumber !== undefined && beneficiary.phoneNumber !== null
        ? beneficiary.phoneNumber
        : ''
    );
  };

  const onCloseModal = (): void => {
    setShowModal(false);
    setModalType('');
  };

  const onSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    e.preventDefault();

    const payload: Beneficiary = {
      beneficiaryId: values.beneficiaryId,
      name: values.name,
      phoneNumber: phone,
      studentId: values.studentId,
      email: values.email,
      bankAccount: values.bankAccount,
      additionalInfo: values.additionalInfo,
      userId: values.userId,
    };
    dispatch(updateBeneficiaryRequest(payload));
  };

  useEffect(() => {
    setIsSubmitting(isUpdatingBeneficiary);
    setIsSuccess(updateBeneficiarySuccess);
    setTimeout(() => dispatch(clearSomeBooleans()), 5000);
  }, [isUpdatingBeneficiary, updateBeneficiarySuccess, dispatch]);

  return (
    <React.Fragment>
      <div className="contacts-container">
        {currrentBeneficiaries.map((beneficiary) =>
          !isEmpty(beneficiary.name) ? (
            <Recipient
              beneficiary={beneficiary}
              key={beneficiary.beneficiaryId}
              onShowModalClick={onShowModalClick}
            />
          ) : null
        )}
      </div>
      <div className="pagination-container">
        <Pagination
          perPage={perPage}
          total={beneficiaries.length}
          paginate={paginate}
          active={currentPage}
        />
      </div>
      {showModal && modalType === modalTypes.EDIT_BENEFICIARY ? (
        <ModalContainer
          show={showModal}
          onClose={onCloseModal}
          header="Edit Beneficiary"
        >
          <RecipientForm
            btnTitle="Update Beneficiary"
            loading={isSubmitting}
            onChange={onChange}
            phone={phone}
            setPhoneNumber={setPhoneNumber}
            values={values}
            onSubmit={onSubmit}
            isSuccess={isSuccess}
            btnIcon="fa-save"
            message="Beneficiary updated successfully"
          />
        </ModalContainer>
      ) : null}
    </React.Fragment>
  );
};
