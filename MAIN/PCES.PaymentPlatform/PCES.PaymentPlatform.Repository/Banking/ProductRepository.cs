using Dapper;
using PCES.PaymentPlatform.DomainClasses.Banking;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCES.PaymentPlatform.Repository.Banking
{
    public class ProductRepository : RepositoryBase
    {
        //////public IEnumerable<ProductCategory> GetProductCategories()
        //////{
        //////    using (connection)
        //////    {
        //////        var productCategories = connection.Query<ProductCategory>("SELECT * FROM \"ProductCategories\"");
        //////        if (productCategories != null && productCategories.Count() > 0)
        //////            Parallel.ForEach(productCategories, productCategory =>
        //////            {
        //////                productCategory.Products = connection.Query<Product>("SELECT \"ProductId\" AS \"ProductId\" , \"Name\" AS \"Name\" FROM \"Products\"");
        //////            });
        //////        return productCategories;
        //////    }
        //////}
    }
}
