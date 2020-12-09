using System;
using System.Collections.Generic;
using System.Text;

namespace PCES.PaymentPlatform.DomainClasses.Banking
{
   public class MerchantProduct
    {
        public int MerchantId { get; set; }
        public Merchant Merchant { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
