import { Interface } from 'readline';

export type IError = {
  type?: string;
  title?: string;
  status?: number;
  traceId?: string;
  errors?: any;
};
