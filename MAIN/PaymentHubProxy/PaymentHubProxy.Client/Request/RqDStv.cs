using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Client.Request
{
   public class RqDStv
    {
        public string deviceNumber { get; set; }
        public string CustomerNumber { get; set; }
        public string AccountNumber { get; set; }
        public string SmartCardNumber { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public string TransactionID { get; set; }
        public string PIN { get; set; }
    }
}
