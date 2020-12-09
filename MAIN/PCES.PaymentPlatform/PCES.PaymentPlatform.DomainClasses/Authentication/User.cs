using PCES.PaymentPlatform.DomainClasses.Banking;
using PCES.PaymentPlatform.DomainClasses.Classifiers;
using System.Collections.Generic;

namespace PCES.PaymentPlatform.DomainClasses.Authentication
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string PasswordSalt { get; set; }
        public string Email { get; set; }
        public bool IsGlobalAdministrator { get; set; }
        public Application Application { get; set; }
        public IEnumerable<Role> Roles { get; set; }
        public Client Client { get; set; }
        public Merchant Merchant { get; set; }
        public Culture PreferredCulture { get; set; }
    }
}
