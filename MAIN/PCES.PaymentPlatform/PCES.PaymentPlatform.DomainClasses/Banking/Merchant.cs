using PCES.PaymentPlatform.DomainClasses.Authentication;
using System;
using System.Collections.Generic;
using System.Reflection.Metadata;

namespace PCES.PaymentPlatform.DomainClasses.Banking
{
    public class Merchant
    {
        public int MerchantId { get; set; }
        public string Name { get; set; }
        public int? ParentMerchantId { get; set; }
        public Merchant ParentMerchant { get; set; }
        public int UserId { get; set; }
        public IList<Product> Products { get; set; }
        public IList<ProductCategory> ProductCategories { get; set; }

        public string Image { get; set; }

        public DateTime? CreatedWhen { get; set; }

    }
}
