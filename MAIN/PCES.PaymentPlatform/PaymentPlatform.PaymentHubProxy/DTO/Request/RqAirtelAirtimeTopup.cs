using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentPlatform.PaymentHubProxy.DTO.Request
{
   public class RqAirtelAirtimeTopup
    {
        public string ContractIdentifier { get; set; }
        public string AccountNumber { get; set; }
        public decimal Amount { get; set; }
        public string BeneficiaryPhoneNumber { get; set; }
        public string ProviderName { get; set; }
        public string Currency { get; set; }
        public string TransactionReference { get; set; }
    }
}
