using PCES.PaymentPlatform.DomainClasses.Classifiers;

namespace PCES.PaymentPlatform.DomainClasses.Banking
{
    public class Fee
    {
        public int FeeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CalculationStoredProcedure { get; set; }
        public FrequencyType FrequencyType { get; set; }
        public Application Application { get; set; }
    }
}
