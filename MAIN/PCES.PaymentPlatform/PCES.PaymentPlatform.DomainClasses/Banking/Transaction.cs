using PCES.PaymentPlatform.DomainClasses.Classifiers;
using PCES.PaymentPlatform.DomainClasses.SystemProcess;
using System;

namespace PCES.PaymentPlatform.DomainClasses.Banking
{
    public class Transaction
    {
        public int TransactionId { get; set; }
        public Account DebitAccount { get; set; }
        public Account CreditAccount { get; set; }
        public string Currency { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedWhen { get; set; }
        public DateTime CreatedWhenUTC { get; set; }
        public TransactionType TransactionType { get; set; }
        public Process Process { get; set; }
        public string TransactionDefinition { get; set; }
    }
}
