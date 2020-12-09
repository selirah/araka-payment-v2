using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Contracts.DataContracts
{
    [DataContract]
   public class RespCanalPlusCheckAccountReturn
    {
        [DataMember]
        public int ReturnCode { get; set; }
        [DataMember]
        public string ErrorCode { get; set; }
        [DataMember]
        public string ErrorLabel { get; set; }
        [DataMember]
        public bool SubscriberFound { get; set; }
        [DataMember]
        public string IDBase { get; set; }
        [DataMember]
        public string SubscriberNumber { get; set; }
        [DataMember]
        public string ContractNumber { get; set; }
        [DataMember]
        public string AccountReference { get; set; }
        [DataMember]
        public string Currency { get; set; }
        [DataMember]
        public string TokenId { get; set; }
        [DataMember]
        public Offer[] Offerslist { get; set; }
    }

    [DataContract]
    public class Offer
    {
        [DataMember]
        public string Code { get; set; }
        [DataMember]
        public string Label { get; set; }
        [DataMember]
        public SelectableOption[] Durations { get; set; }
        [DataMember]
        public SelectableOption[] OptionsList { get; set; }
    }

    [DataContract]
    public class SelectableOption
    {
        [DataMember]
        public string Code { get; set; }
        [DataMember]
        public string Label { get; set; }
    }
}
