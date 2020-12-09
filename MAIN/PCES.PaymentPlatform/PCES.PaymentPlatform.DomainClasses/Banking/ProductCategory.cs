using System.Collections.Generic;

namespace PCES.PaymentPlatform.DomainClasses.Banking
{
    public class ProductCategory
    {
        public int ProductCategoryId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public IList<Merchant> Merchants { get; set; }
        public IList<Product> Products { get; set; }
    }
}
