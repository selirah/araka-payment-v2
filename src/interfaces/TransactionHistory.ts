export type TransactionHistory = {
  transactionId: number,
  createdAt: string,
  amountPaid: number,
  transactionDescription: string,
  charge: number,
  vat: number,
  transactionDetails: {
    data?: any
  }
};
