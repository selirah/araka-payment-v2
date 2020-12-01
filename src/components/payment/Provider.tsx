<<<<<<< HEAD
import React from 'react';
import { Product } from '../../interfaces';

type Prop = {
  product: Product;
  updateSelectedProduct(productId: number, product: Product): void;
  activeProduct: number;
};

const Provider: React.FC<Prop> = ({
  product,
  updateSelectedProduct,
  activeProduct,
}) => {
  return (
    <React.Fragment>
      <div className="col-sm-3 text-center option">
        <div
          className={`selectable-item ${
            activeProduct === product.productId ? 'selected' : null
          }`}
          onClick={() => updateSelectedProduct(product.productId, product)}
        >
          <div
            className="image-placeholder"
            
            style={{
              backgroundImage: `url(data:image/jpeg;base64,${product.image})`,
              cursor: 'pointer',
            }}
          ></div>
          {/* <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt=""
            onClick={() => updateSelectedProduct(product.productId, product)}
          /> */}
          <h2>
            {product.name}
          </h2>
        </div>
      </div>
    </React.Fragment>
  );
};

export { Provider };
=======
import React from 'react';
import { Product } from '../../interfaces';

type Prop = {
  product: Product;
  updateSelectedProduct(productId: number, product: Product): void;
  activeProduct: number;
};

const Provider: React.FC<Prop> = ({
  product,
  updateSelectedProduct,
  activeProduct,
}) => {
  return (
    <React.Fragment>
      <div className="col-sm-3 text-center option">
        <div
          className={`selectable-item ${
            activeProduct === product.productId ? 'selected' : null
          }`}
          onClick={() => updateSelectedProduct(product.productId, product)}
        >
          <div
            className="image-placeholder"
            
            style={{
              backgroundImage: `url(data:image/jpeg;base64,${product.image})`,
              cursor: 'pointer',
            }}
          ></div>
          {/* <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt=""
            onClick={() => updateSelectedProduct(product.productId, product)}
          /> */}
          <h2>
            {product.name}
          </h2>
        </div>
      </div>
    </React.Fragment>
  );
};

export { Provider };
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157
