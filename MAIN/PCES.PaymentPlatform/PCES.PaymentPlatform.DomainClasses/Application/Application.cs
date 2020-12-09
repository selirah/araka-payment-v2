using PCES.PaymentPlatform.DomainClasses.Authentication;
using PCES.PaymentPlatform.DomainClasses.Classifiers;
using System.Collections.Generic;

namespace PCES.PaymentPlatform.DomainClasses
{
    public class Application
    {
        public int ApplicationId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsEnabled { get; set; }
        public IEnumerable<ApplicationAlias> ApplicationAliases { get; set; }
        public IEnumerable<Role> Roles { get; set; }
        public IEnumerable<ProcessCode> ProcessCodes { get; set; }
        public Culture DefaultCulture { get; set; }
        public IEnumerable<Culture> AllowedCultures { get; set; }
    }
}
