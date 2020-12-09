using System;
using System.Collections.Generic;
using System.Text;

namespace PCES.PaymentPlatform.DomainClasses.Banking
{
   public class ProductCategoryMerchant
    {
        public int ProductCategoryId { get; set; }
        public ProductCategory ProductCategory { get; set; }
        public int MerchantId { get; set; }
        public Merchant Merchant { get; set; }
    }
}
