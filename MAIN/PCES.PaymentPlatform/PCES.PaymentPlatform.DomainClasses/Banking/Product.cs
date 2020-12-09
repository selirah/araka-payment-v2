using System;
using System.Collections.Generic;

namespace PCES.PaymentPlatform.DomainClasses.Banking
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public DateTime CreatedWhen { get; set; }
        public int ProductCategoryId { get; set; }
        public string Image { get; set; }
        public string Form { get; set; }
        public Guid Guid { get; set; }
    }
}
