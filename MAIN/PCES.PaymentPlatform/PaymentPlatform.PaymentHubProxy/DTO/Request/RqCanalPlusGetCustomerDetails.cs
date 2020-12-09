using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentPlatform.PaymentHubProxy.DTO.Request
{
   public class RqCanalPlusGetCustomerDetails
    {
        public string CardNumber { get; set; }
        public string TransactionReference { get; set; }
    }
}
