using PCES.PaymentPlatform.DomainClasses.Authentication;
using PCES.PaymentPlatform.DomainClasses.Classifiers;
using System;

namespace PCES.PaymentPlatform.DomainClasses.SystemProcess
{
    public class ProcessReason
    {
        public int ProcessReasonId { get; set; }
        public string Reason { get; set; }
        public DateTime CreatedWhen { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ProcessId { get; set; }
        public Process Process { get; set; }
        public int ReasonTypeId { get; set; }
        public ProcessReasonType ProcessReasonType { get; set; }
    }
}
