using System.Collections.Generic;

namespace PCES.PaymentPlatform.DomainClasses.Authentication
{
    public class Permission
    {
        public int PermissionId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IEnumerable<Role> Roles { get; set; }        
    }
}
