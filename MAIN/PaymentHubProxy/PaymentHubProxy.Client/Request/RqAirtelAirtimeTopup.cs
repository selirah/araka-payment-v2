using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Client.Request
{
   public class RqAirtelAirtimeTopup
    {
        public string ContractIdentifier { get; set; }
        public string AccountNumber { get; set; }
        public decimal Amount { get; set; }
        public string BeneficiaryPhoneNumber { get; set; }
        public string ProviderName { get; set; }
        public string Currency { get; set; }
        public string TransactionId { get; set; }
        public string PIN { get; set; }
    }
}
