import { IMerchant } from './IMerchant';

export interface ICategory {
  productCategoryId: number;
  name: string;
  merchants: IMerchant[];
}
