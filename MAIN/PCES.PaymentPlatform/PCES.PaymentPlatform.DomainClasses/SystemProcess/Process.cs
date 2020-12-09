using PCES.PaymentPlatform.DomainClasses.Authentication;
using PCES.PaymentPlatform.DomainClasses.Classifiers;
using System;

namespace PCES.PaymentPlatform.DomainClasses.SystemProcess
{
    public class Process
    {
        public int ProcessId { get; set; }
        public ProcessCode ProcessCode { get; set; }
        public DateTime CreatedWhen { get; set; }
        public User User { get; set; }
        public string AdditionalInfo { get; set; }
    }
}
