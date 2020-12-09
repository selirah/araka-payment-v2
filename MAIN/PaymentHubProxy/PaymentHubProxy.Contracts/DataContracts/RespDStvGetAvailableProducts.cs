using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Contracts.DataContracts
{
    [DataContract]
   public class RespDStvGetAvailableProducts
    {
        [DataMember]
        public string Currency { get; set; }
        [DataMember]
        public string DefaultCurrencyCode { get; set; }
        [DataMember]
        public decimal DefaultCurrencyProductPrice { get; set; }
        [DataMember]
        public bool HasCustomer { get; set; }
        [DataMember]
        public string ProductCode { get; set; }
        [DataMember]
        public string ProductDescription { get; set; }
        [DataMember]
        public decimal ProductPrice { get; set; }
    }
}
