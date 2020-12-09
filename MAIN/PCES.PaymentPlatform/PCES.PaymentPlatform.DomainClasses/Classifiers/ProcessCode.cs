namespace PCES.PaymentPlatform.DomainClasses.Classifiers
{
    public class ProcessCode
    {
        public int ProcessCodeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Definition { get; set; }
        public Application Application { get; set; }
    }
}
