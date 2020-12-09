import React from 'react';
import { IProduct } from '../../models/IProduct';
import { FormIO } from '../form/FormIO';
// import { FormIOSchema } from '../../mock/FormIOSchema';

const ProductForm: React.FC<{
  product: IProduct | undefined;
  prevHeaderState: string;
}> = ({ product, prevHeaderState }) => {
  return (
    <React.Fragment>
      <div className="col-md-12">
        <FormIO
          formSchema={JSON.parse(product?.form)}
          prevHeaderState={prevHeaderState}
        />
      </div>
    </React.Fragment>
  );
};

export { ProductForm };
