using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Contracts.DataContracts
{
    [DataContract]
   public class RespDStvGetDueAmountAndDate
    {
        [DataMember]
        public string Currency { get; set; }
        [DataMember]
        public DateTime DueDate { get; set; }
        [DataMember]
        public decimal Amount { get; set; }
    }
}
