using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Contracts.DataContracts
{
    [DataContract]
    public class RespTransactionResponse
    {
        [DataMember]
        public string OriginatingTransactionID { get; set; }
        [DataMember]
        public string TransactionID { get; set; }
        [DataMember]
        public string Status { get; set; }
        [DataMember]
        public int TransactionStatus { get; set; }
    }
}
