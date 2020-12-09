import React from 'react';
import { IProduct } from '../../models/IProduct';

interface IProductProps {
  product: IProduct;
  showForm(product: IProduct): void;
}

const Product: React.FC<IProductProps> = ({ product, showForm }) => {
  return (
    <React.Fragment>
      <p
        className="col-md-4 col-sm-8 payment_option_item_product"
        onClick={() => showForm(product)}
      >
        {product.name}
      </p>
    </React.Fragment>
  );
};

export { Product };
