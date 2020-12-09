import { IFormField } from '../models/IFormField';

export const FormSchema: IFormField[] = [
  {
    type: 'text',
    placeholder: 'Name',
    name: 'name',
    required: true,
  },
  {
    type: 'email',
    placeholder: 'Email',
    name: 'email',
    required: true,
  },
  {
    type: 'text',
    placeholder: 'Phone Number',
    name: 'phone',
    required: true,
  },
];
