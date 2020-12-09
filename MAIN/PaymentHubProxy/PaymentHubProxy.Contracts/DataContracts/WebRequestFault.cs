using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Contracts.DataContracts
{
    [DataContract]
    public class WebRequestFault
    {
        [DataMember]
        public bool Result { get; set; }
        [DataMember]
        public PaymentHubResponseCode Code { get; set; }
        [DataMember]
        public string Message { get; set; }
        [DataMember]
        public string Description { get; set; }
    }

    [DataContract]
    public enum PaymentHubResponseCode
    {
        [EnumMember]
        Success = 200,
        [EnumMember]
        AuthenticationError = 300,
        [EnumMember]
        MissingParameter = 400,
        [EnumMember]
        SystemError = 500,
        [EnumMember]
        NotFound = 600,
        [EnumMember]
        ValidationError = 700
    }
}
