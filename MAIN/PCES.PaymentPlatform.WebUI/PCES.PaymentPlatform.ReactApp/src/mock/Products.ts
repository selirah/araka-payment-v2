import { IProduct } from '../models/IProduct';

export const Products: IProduct[] = [
  {
    productId: 5,
    name: 'Vodacom Airtime',
    createdWhen: '0001-01-01T00:00:00',
    productCategoryId: 0,
    guid: '79a08efe-762e-40cb-89de-2e8ed2d4cb0f',
    form:
      '{\r\n"display": "form",\r\n"components": [\r\n{\r\n"label": "Beneficiary Number",\r\n"tableView": true,\r\n"key": "beneficiaryNumber",\r\n"type": "textfield",\r\n"input": true\r\n},\r\n{\r\n"label": "Amount",\r\n"tableView": true,\r\n"key": "amount",\r\n"type": "textfield",\r\n"input": true\r\n},\r\n{\r\n"type": "button",\r\n"label": "Submit",\r\n"key": "submit",\r\n"disableOnInvalid": true,\r\n"input": true,\r\n"tableView": false\r\n}\r\n]\r\n}',
  },
];
