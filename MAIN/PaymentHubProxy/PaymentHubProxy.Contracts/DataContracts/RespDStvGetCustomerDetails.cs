using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Contracts.DataContracts
{
    [DataContract]
   public class RespDStvGetCustomerDetails
    {
        [DataMember]
        public string CustomerNumber { get; set; }
    }
}
