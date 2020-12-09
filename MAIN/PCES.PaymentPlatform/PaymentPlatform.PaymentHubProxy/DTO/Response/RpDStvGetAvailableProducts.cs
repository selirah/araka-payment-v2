using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentPlatform.PaymentHubProxy.DTO.Response
{
   public class RpDStvGetAvailableProducts
    {
        public string Currency { get; set; }
        public string DefaultCurrencyCode { get; set; }
        public decimal DefaultCurrencyProductPrice { get; set; }
        public bool HasCustomer { get; set; }
        public string ProductCode { get; set; }
        public string ProductDescription { get; set; }        
        public decimal ProductPrice { get; set; }
    }
}
