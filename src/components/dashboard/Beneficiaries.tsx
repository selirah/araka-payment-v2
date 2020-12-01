<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Beneficiary, Recipient as R } from '../../interfaces';
import { Recipient } from './Recipient';
import { isEmpty } from '../../helpers/isEmpty';
import { Pagination } from './Pagination';
import { modalTypes } from '../../helpers/constants';
import { ModalContainer } from '../common/ModalContainer';
import { RecipientForm } from './RecipientForm';
import {
  updateBeneficiaryRequest,
  clearSomeBooleans,
  deleteBeneficiaryRequest,
} from '../../store/dashboard';
import { setRecipientValues } from '../../store/payment';
import { checkedIcon } from '../../images/Images';
import { path } from '../../helpers/path';

interface BeneficiariesProps {
  beneficiaries: Beneficiary[];
}

export const Beneficiaries: React.FC<BeneficiariesProps> = ({
  beneficiaries,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const { user } = appSelector((state) => state.auth);
  const {
    isUpdatingBeneficiary,
    updateBeneficiarySuccess,
    isDeletingBeneficiary,
    deletedBeneficiary,
  } = appSelector((state) => state.dashboard);
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
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('this beneficiary');

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

  const onDeleteBeneficiaryClick = (
    type: string,
    beneficiaryId: number
  ): void => {
    setId(beneficiaryId);
    setShowModal(true);
    setModalType(type);
    const b = beneficiaries.find((b) => b.beneficiaryId === beneficiaryId);
    if (b !== undefined) {
      setName(b.name);
    }
  };

  const deleteBeneficiary = (): void => {
    dispatch(deleteBeneficiaryRequest(id));
  };

  useEffect(() => {
    setIsSubmitting(isUpdatingBeneficiary);
    setIsSuccess(updateBeneficiarySuccess);
    setIsDeleting(isDeletingBeneficiary);
    setDeleted(deletedBeneficiary);
    setTimeout(() => {
      dispatch(clearSomeBooleans());
      onCloseModal();
    }, 5000);
  }, [
    isUpdatingBeneficiary,
    updateBeneficiarySuccess,
    dispatch,
    isDeletingBeneficiary,
    deletedBeneficiary,
  ]);

  const setBeneficiaryValue = (name: string, value: string): void => {
    const payload: R = {
      name: name,
      value: value,
    };
    dispatch(setRecipientValues(payload));
    history.push(path.payment);
  };

  return (
    <React.Fragment>
      <div className="contacts-container">
        {currrentBeneficiaries.map((beneficiary) =>
          !isEmpty(beneficiary.name) ? (
            <Recipient
              beneficiary={beneficiary}
              key={beneficiary.beneficiaryId}
              onShowModalClick={onShowModalClick}
              onDeleteBenefiaryClick={onDeleteBeneficiaryClick}
              setBeneficiaryValue={setBeneficiaryValue}
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

      {showModal && modalType === modalTypes.DELETE_BENEFICIARY ? (
        <ModalContainer
          show={showModal}
          onClose={onCloseModal}
          header="Delete Beneficiary"
        >
          <div className="row justify-content-center">
            <div className="delete-beneficary">
              {deleted ? (
                <React.Fragment>
                  <h2>Beneficiary Deleted Successfully</h2>
                  <img src={checkedIcon} alt="success" className="success" />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <h2>Do you really want to delete {name}?</h2>
                  <button
                    className="btn delete-btn"
                    onClick={() => deleteBeneficiary()}
                  >
                    <i
                      className={`fa ${
                        !isDeleting ? 'fa-trash' : 'fa-spinner fa-spin'
                      }`}
                    ></i>{' '}
                    Yes, Delete
                  </button>
                  <button
                    className="btn cancel-btn"
                    onClick={() => onCloseModal()}
                  >
                    <i className="fa fa-times"></i> Cancel
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
        </ModalContainer>
      ) : null}
    </React.Fragment>
  );
};
=======
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Beneficiary, Recipient as R } from '../../interfaces';
import { Recipient } from './Recipient';
import { isEmpty } from '../../helpers/isEmpty';
import { Pagination } from './Pagination';
import { modalTypes } from '../../helpers/constants';
import { ModalContainer } from '../common/ModalContainer';
import { RecipientForm } from './RecipientForm';
import {
  updateBeneficiaryRequest,
  clearSomeBooleans,
  deleteBeneficiaryRequest,
} from '../../store/dashboard';
import { setRecipientValues } from '../../store/payment';
import { checkedIcon } from '../../images/Images';
import { path } from '../../helpers/path';

interface BeneficiariesProps {
  beneficiaries: Beneficiary[];
}

export const Beneficiaries: React.FC<BeneficiariesProps> = ({
  beneficiaries,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const { user } = appSelector((state) => state.auth);
  const {
    isUpdatingBeneficiary,
    updateBeneficiarySuccess,
    isDeletingBeneficiary,
    deletedBeneficiary,
  } = appSelector((state) => state.dashboard);
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
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('this beneficiary');

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

  const onDeleteBeneficiaryClick = (
    type: string,
    beneficiaryId: number
  ): void => {
    setId(beneficiaryId);
    setShowModal(true);
    setModalType(type);
    const b = beneficiaries.find((b) => b.beneficiaryId === beneficiaryId);
    if (b !== undefined) {
      setName(b.name);
    }
  };

  const deleteBeneficiary = (): void => {
    dispatch(deleteBeneficiaryRequest(id));
  };

  useEffect(() => {
    setIsSubmitting(isUpdatingBeneficiary);
    setIsSuccess(updateBeneficiarySuccess);
    setIsDeleting(isDeletingBeneficiary);
    setDeleted(deletedBeneficiary);
    setTimeout(() => {
      dispatch(clearSomeBooleans());
      onCloseModal();
    }, 5000);
  }, [
    isUpdatingBeneficiary,
    updateBeneficiarySuccess,
    dispatch,
    isDeletingBeneficiary,
    deletedBeneficiary,
  ]);

  const setBeneficiaryValue = (name: string, value: string): void => {
    const payload: R = {
      name: name,
      value: value,
    };
    dispatch(setRecipientValues(payload));
    history.push(path.payment);
  };

  return (
    <React.Fragment>
      <div className="contacts-container">
        {currrentBeneficiaries.map((beneficiary) =>
          !isEmpty(beneficiary.name) ? (
            <Recipient
              beneficiary={beneficiary}
              key={beneficiary.beneficiaryId}
              onShowModalClick={onShowModalClick}
              onDeleteBenefiaryClick={onDeleteBeneficiaryClick}
              setBeneficiaryValue={setBeneficiaryValue}
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

      {showModal && modalType === modalTypes.DELETE_BENEFICIARY ? (
        <ModalContainer
          show={showModal}
          onClose={onCloseModal}
          header="Delete Beneficiary"
        >
          <div className="row justify-content-center">
            <div className="delete-beneficary">
              {deleted ? (
                <React.Fragment>
                  <h2>Beneficiary Deleted Successfully</h2>
                  <img src={checkedIcon} alt="success" className="success" />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <h2>Do you really want to delete {name}?</h2>
                  <button
                    className="btn delete-btn"
                    onClick={() => deleteBeneficiary()}
                  >
                    <i
                      className={`fa ${
                        !isDeleting ? 'fa-trash' : 'fa-spinner fa-spin'
                      }`}
                    ></i>{' '}
                    Yes, Delete
                  </button>
                  <button
                    className="btn cancel-btn"
                    onClick={() => onCloseModal()}
                  >
                    <i className="fa fa-times"></i> Cancel
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
        </ModalContainer>
      ) : null}
    </React.Fragment>
  );
};
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
