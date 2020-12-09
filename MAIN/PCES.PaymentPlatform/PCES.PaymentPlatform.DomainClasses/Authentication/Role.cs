using System.Collections.Generic;

namespace PCES.PaymentPlatform.DomainClasses.Authentication
{
    public class Role
    {
        public int RoleId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Application Application { get; set; }
        public IEnumerable<User> Users { get; set; }
        public IEnumerable<Permission> Permissions { get; set; }
    }
}
