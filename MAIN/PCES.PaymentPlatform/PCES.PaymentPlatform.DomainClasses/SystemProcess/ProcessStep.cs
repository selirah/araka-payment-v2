using PCES.PaymentPlatform.DomainClasses.Classifiers;

namespace PCES.PaymentPlatform.DomainClasses.SystemProcess
{
    public class ProcessStep
    {
        public int ProcessStepId { get; set; }
        public ProcessStepType ProcessStepType { get; set; }
        public Process Process { get; set; }
    }
}
