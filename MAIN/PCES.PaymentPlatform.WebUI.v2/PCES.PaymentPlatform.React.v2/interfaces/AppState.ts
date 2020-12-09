import { Category } from './Category';
import { Product } from './Product';
import { OrderResponse } from './OrderResponse';

export type AppState = {
  readonly categories: Category[];
  readonly products: Product[];
  readonly loading: boolean;
  readonly error: any;
  readonly step: number;
  readonly activeCategory: number;
  readonly screen: string;
  readonly activeProduct: number;
  readonly orderResponse: OrderResponse | undefined;
  readonly isSubmit: boolean;
  readonly orderData: any;
};
