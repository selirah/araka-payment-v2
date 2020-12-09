using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Client.Response
{
    public class RpDStvGetDueAmountAndDate
    {
        public string Currency { get; set; }
        public DateTime DueDate { get; set; }
        public decimal Amount { get; set; }
    }
}
