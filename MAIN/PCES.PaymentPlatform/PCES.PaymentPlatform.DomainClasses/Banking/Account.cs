using System;

namespace PCES.PaymentPlatform.DomainClasses.Banking
{
    public class Account
    {
        public int AccountId { get; set; }
        public string AccountNumber { get; set; }
        public string OldAccountNumber { get; set; }
        public Merchant Merchant { get; set; }
        public DateTime CreatedWhen { get; set; }
        public DateTime? ClosedWhen { get; set; }
        public decimal MinimumAllowedBalance { get; set; }
        public decimal MaximumAllowedBalance { get; set; }
        public string AccountName { get; set; }
        public decimal Balance { get; set; }
        public decimal AvailableBalance { get; set; }
        public string Currency { get; set; }
    }
}
