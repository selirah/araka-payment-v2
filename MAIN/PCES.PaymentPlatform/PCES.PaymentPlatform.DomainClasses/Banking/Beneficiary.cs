using System;
using System.Collections.Generic;
using System.Text;

namespace PCES.PaymentPlatform.DomainClasses.Banking
{
   public class Beneficiary
    {
        public int BeneficiaryId { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string StudentId { get; set; }
        public string Email { get; set; }
        public string BankAccount { get; set; }
        public string AdditionalInfo { get; set; }
        public int UserId { get; set; }
    }
}
