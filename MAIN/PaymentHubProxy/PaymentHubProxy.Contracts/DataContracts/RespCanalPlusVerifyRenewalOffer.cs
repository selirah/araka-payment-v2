using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Contracts.DataContracts
{
    [DataContract]
   public class RespCanalPlusVerifyRenewalOffer
    {
        [DataMember]
        public string SubscriberNumber { get; set; }
        [DataMember]
        public string ContractNumber { get; set; }
        [DataMember]
        public decimal Amount { get; set; }
        [DataMember]
        public string ExpiryDate { get; set; }
        [DataMember]
        public string Currency { get; set; }
        [DataMember]
        public RespCanalPlusCodeLabel MainOffer { get; set; }
        [DataMember]
        public RespCanalPlusCodeLabel Duration { get; set; }
    }

    [DataContract]
    public class RespCanalPlusCodeLabel
    {
        [DataMember]
        public string Code { get; set; }
        [DataMember]
        public string Label { get; set; }
    }
}
