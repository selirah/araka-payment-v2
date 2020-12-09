using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentPlatform.PaymentHubProxy.DTO.Request
{
   public class RqCanalPlus
    {
        public string SubscriberNumber { get; set; }
        public string ContractNumber { get; set; }
        public decimal Amount { get; set; }
        public string Duration { get; set; }
        public string SelectedOffer { get; set; }
        public string SelectedOption { get; set; }
        public string TokenId { get; set; }
        public string AccountNumber { get; set; }
        public string TransactionReference { get; set; }
        public string SmartCardNumber { get; set; }
        public string BeneficiaryPhoneNumber { get; set; }
        public string Currency { get; set; }
        public string PhoneNumber { get; set; }
        public string PIN { get; set; }
        public string TransactionID { get; set; }
    }
}
