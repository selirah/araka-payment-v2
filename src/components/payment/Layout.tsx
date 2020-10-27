import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { NavLayout } from './NavLayout';
import { ProcessWizard } from './ProcessWizard';
import { PageContainer } from './PageContainer';
import { Help } from './Help';
import { Reset } from './Reset';
import { Category, Product } from '../../interfaces';
import { filterProducts, filterCategories } from '../../helpers/functions';
import { Spinner } from '../common/Spinner';
import { DisplayHeader } from './DisplayHeader';
import { isEmpty } from '../../helpers/isEmpty';
import { Providers } from './Providers';
import { Details } from './Details';
import { Summary } from './Summary';
import { Pay } from './Pay';
import { Error } from '../common/Error';
import { setActiveCategory, setCategory } from '../../store/payment';

type Props = {
  title?: string;
};

const Layout: React.FC<Props> = ({ title }) => {
  const dispatch: AppDispatch = useDispatch();
  const { categories, loading, step, orderError } = appSelector(
    (state) => state.payment
  );
  const [spinner, setSpinner] = useState<boolean>(loading);
  const [categoryData, setCategoryData] = useState<Category[]>(categories);
  const [mainTitle, setMainTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [smallText, setSmallText] = useState<string>('');
  const [className, setClassName] = useState<string>('');
  const [textAlign, setTextAlign] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();
  const [active, setActive] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>(
    filterProducts(categoryData)
  );
  const [defaultCategories] = useState<Category[]>(categories);

  useEffect(() => {
    setSpinner(loading);
    setCategoryData(categories);
    setError(orderError);

    switch (step) {
      case 1:
        setMainTitle('');
        setSubTitle(t('wizard.step-2.subtitle'));
        setSmallText(t('wizard.step-2.small-text'));
        setTextAlign('text-left');
        setClassName('');
        break;
      case 2:
        setMainTitle('');
        setSubTitle('All Fields are required');
        setSmallText('');
        setTextAlign('text-center');
        setClassName('valid-info');
        break;
      case 3:
        setMainTitle('');
        setSubTitle('');
        setSmallText('');
        setTextAlign('');
        setClassName('');
        break;
      case 4:
        setMainTitle('');
        setSubTitle(t('wizard.step-3.subtitle'));
        setSmallText(t('wizard.step-3.small-text'));
        setTextAlign('text-center');
        setClassName('');
        break;
    }
  }, [loading, categories, step, orderError, t]);

  let render: React.ReactNode;

  if (spinner && isEmpty(categoryData)) {
    render = <Spinner />;
  } else {
    switch (step) {
      case 1:
        render = <Providers products={products} />;
        break;
      case 2:
        render = <Details />;
        break;
      case 3:
        render = <Summary />;
        break;
      case 4:
        render = <Pay />;
        break;
    }
  }

  const getProductAllProducts = (id: number): void => {
    setProducts(filterProducts(categoryData));
    setActive(id);
  };

  const getProducts = (id: number, category: Category): void => {
    setProducts(category.products);
    dispatch(setActiveCategory(id));
    dispatch(setCategory(category));
    setActive(id);
  };

  let paymentOptions: React.ReactNode;

  if (!isEmpty(categoryData) && categoryData !== []) {
    paymentOptions = categoryData.map((c) => (
      <li
        className={`nav-link ${
          c.productCategoryId === active ? 'active' : null
        }`}
        key={c.productCategoryId}
        onClick={() => getProducts(c.productCategoryId, c)}
        style={{ cursor: 'pointer' }}
      >
        <Link to="#">{c.name}</Link>
      </li>
    ));
  }

  const onSearchCategory = (e: React.FormEvent<EventTarget>): void => {
    const { value } = e.target as HTMLTextAreaElement;
    if (value !== '') {
      const cats: Category[] = filterCategories(categories, value);
      if (!isEmpty(cats)) {
        setCategoryData(cats);
      } else {
        setCategoryData([]);
      }
    } else {
      setCategoryData(defaultCategories);
    }
  };

  return (
    <section className="payment-app">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <NavLayout>
        <ProcessWizard />
      </NavLayout>
      <PageContainer>
        <div className="card">
          {!isEmpty(error) ? <Error error={error} /> : null}
          <div className="card-body wizard-card my-5">
            <div className="row">
              {step === 1 ? (
                <div className="col-md-3">
                  <ul
                    className="nav d-flex nav-pills wizard-nav"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <li className="nav-link search-nav">
                      <div className="search">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control bg-light small"
                            placeholder={t('dashboard.old-user.search')}
                            onChange={onSearchCategory}
                          />
                        </div>
                      </div>
                    </li>
                    <li
                      className={`nav-link ${0 === active ? 'active' : null}`}
                      onClick={() => getProductAllProducts(0)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Link to="#">All Payment Types</Link>
                    </li>
                    {paymentOptions}
                  </ul>
                </div>
              ) : null}
              <div className={`${step === 1 ? 'col-md-9' : 'col-md-12'}`}>
                {subTitle !== '' ? (
                  <DisplayHeader
                    h2={mainTitle}
                    h4={subTitle}
                    h6={smallText}
                    textAlign={textAlign}
                    className={className}
                  />
                ) : null}
                {render}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
      <Help />
      <Reset />
    </section>
  );
};

export { Layout };
