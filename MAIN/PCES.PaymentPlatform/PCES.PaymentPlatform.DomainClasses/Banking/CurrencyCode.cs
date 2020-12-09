using System;
using System.Collections.Generic;
using System.Text;

namespace PCES.PaymentPlatform.DomainClasses.Banking
{
   public class CurrencyCode
    {
        public int CurrencyCodeId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public int NumericCode { get; set; }
    }
}
