export type TransactionHistory = {
  transactionId: number
  createdAt: string
  amountPaid: number
  transactionDescription: string
  fee: number
  vat: number
  status: string
  transactionDetails: {
    data?: any
  }
}
