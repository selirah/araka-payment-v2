using PCES.PaymentPlatform.DomainClasses.Authentication;
using System;

namespace PCES.PaymentPlatform.DomainClasses.Banking
{
    public class Client
    {
        public int ClientId { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string OtherName { get; set; }
        public string LastName { get; set; }
        public string  DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
