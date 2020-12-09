import { Product } from './Product';

export type Category = {
  productCategoryId: number;
  name: string;
  image: string;
  merchants: null;
  products: Product[];
};
