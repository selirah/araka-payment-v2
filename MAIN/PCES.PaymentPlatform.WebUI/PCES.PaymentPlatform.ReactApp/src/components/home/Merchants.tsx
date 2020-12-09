import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IMerchant } from '../../models/IMerchant';
import { IProduct } from '../../models/IProduct';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Merchant } from './Merchant';
import { Modal } from '../common/Modal';
import { isEmpty } from '../../helpers/isEmpty';
import { Product } from './Product';
import { modalContent } from '../../helpers/home.helper/constants';
import { ProductForm } from './ProductForm';
import {
  showModal,
  setModalHeader,
  setPrevModalHeader,
  setModalContent,
  fetchProducts,
} from '../../store/home/actions';

const Merchants: React.FC<{ merchants: IMerchant[] }> = ({ merchants }) => {
  const dispatch: AppDispatch = useDispatch();

  const home = appSelector((state) => state.home);
  const [modalPop, setModalPop] = useState(false);
  const [products, setProducts] = useState<IProduct[] | undefined>(undefined);
  const [activeCategory, setActiveCategory] = useState(0);
  const [showModalContent, setShowModalContent] = useState('');
  const [header, setHeader] = useState('');
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [prevHeader, setPrevHeader] = useState('');

  useEffect(() => {
    const {
      showModal,
      active,
      modalContent,
      prevModalHeader,
      modalHeader,
      products,
    } = home;
    setModalPop(showModal);
    setActiveCategory(active);
    setShowModalContent(modalContent);
    setPrevHeader(prevModalHeader);
    setHeader(modalHeader);
    if (!isEmpty(products)) {
      setProducts(products);
    }
  }, [home]);

  /* This function shows the modal and set the appropriate variables (header for modal, find products and set the modal states) */
  const _onModalShowClick = (merchant: IMerchant): void => {
    dispatch(setModalHeader(merchant.name));
    dispatch(setPrevModalHeader(merchant.name));
    dispatch(fetchProducts(activeCategory, merchant.merchantId));
    dispatch(showModal(true));
    dispatch(setModalContent(modalContent.MODAL_CONTENT_MERCHANTS));
  };

  /* This function closes the modal and clears the modal content state */
  const _onHideModalClick = (): void => {
    dispatch(showModal(false));
    dispatch(setModalContent(''));
    dispatch(setModalHeader(''));
    dispatch(setPrevModalHeader(''));
  };

  /* This function shows the form and set the modal content state */
  const showForm = (product: IProduct): void => {
    setHeader(product.name);
    setProduct(product);
    dispatch(setModalContent(modalContent.MODAL_CONTENT_FORM));
    dispatch(setModalHeader(product.name));
  };

  let layout: any = null;
  if (!isEmpty(products) && products !== undefined) {
    layout = products.map((p) => (
      <Product product={p} showForm={showForm} key={p.productId} />
    ));
  }

  return (
    <React.Fragment>
      {merchants.map((m) => (
        <Merchant
          merchant={m}
          onModalShowClick={_onModalShowClick}
          key={m.merchantId}
        />
      ))}
      {modalPop ? (
        <Modal
          show={modalPop}
          onClose={() => _onHideModalClick()}
          header={header}
        >
          <div className="container-fluid">
            <div className="row">
              {showModalContent === modalContent.MODAL_CONTENT_MERCHANTS ? (
                <div className="col-md-12">
                  <div className="select-method">
                    <div className="card">
                      {/* <pre>{JSON.stringify(prods, null, 4)}</pre> */}
                      <div className="row">{layout}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="select-method">
                    <div className="card">
                      <div className="row">
                        <ProductForm
                          product={product !== undefined ? product : undefined}
                          prevHeaderState={prevHeader}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      ) : null}
    </React.Fragment>
  );
};

export { Merchants };
