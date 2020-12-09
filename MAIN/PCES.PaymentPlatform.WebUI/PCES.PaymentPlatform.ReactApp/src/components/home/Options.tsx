import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { ICategory } from '../../models/ICategory';
import { Merchants } from './Merchants';
import { isEmpty } from '../../helpers/isEmpty';
import { setActiveCat } from '../../store/home/actions';
// import { Products } from '../../mock/Products'; // mock data..remove it later

const Options: React.FC<{ categories: ICategory[] }> = ({ categories }) => {
  const dispatch: AppDispatch = useDispatch();
  const home = appSelector((state) => state.home);

  const [merchants, setMerchants] = useState(
    <Merchants
      merchants={categories[0].merchants}
      key={categories[0].productCategoryId}
    />
  );
  const [activeCategory, setActiveCategory] = useState(
    categories[0].productCategoryId
  );

  useEffect(() => {
    dispatch(setActiveCat(categories[0].productCategoryId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { active } = home;
    if (active !== 0) {
      setActiveCategory(active);
    }
  }, [home]);

  const showCategoryMerchants = (id: number): void => {
    dispatch(setActiveCat(id));

    let category = categories.find((c) => c.productCategoryId === id);
    if (!isEmpty(category) && category !== undefined) {
      setMerchants(
        <Merchants
          merchants={category.merchants}
          key={category.productCategoryId}
        />
      );
    }
  };

  const items = categories.map((c) => (
    <li
      key={c.productCategoryId}
      className={`list-group-item ${
        c.productCategoryId === activeCategory ? 'active' : ''
      }`}
      onClick={() => showCategoryMerchants(c.productCategoryId)}
    >
      {c.name}
    </li>
  ));

  return (
    <React.Fragment>
      <div className="col-md-6 col-sm-8">
        <div className="select-method">
          <div className="card">
            <div className="container-fluid row-padding selection">
              <ul className="list-group">{items}</ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-8">
        <div className="select-method">
          <div className="card">
            <div className="row">{merchants}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { Options };
