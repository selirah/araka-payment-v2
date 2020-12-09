using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Contracts.DataContracts
{
    [DataContract]
    class ReqAirtelAirtimeTopup
    {
        [DataMember]
        public string ContractIdentifier { get; set; }

        [DataMember]
        public string AccountNumber { get; set; }

        [DataMember]
        public decimal Amount { get; set; }

        [DataMember]
        public string BeneficiaryPhoneNumber { get; set; }

        [DataMember]
        public string TransactionReference { get; set; }

        [DataMember]
        public string ProviderName { get; set; }

        [DataMember]
        public string Currency { get; set; }
    }
}
