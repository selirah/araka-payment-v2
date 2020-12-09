import { string } from 'yup';

export interface IOrderResponse {
  operation: string;
  status: string;
  order: {
    orderID: string;
    sessionID: string;
    url: string;
    orderURL: string;
  };
}
