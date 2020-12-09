namespace PCES.PaymentPlatform.DomainClasses
{
    public class ApplicationAlias
    {
        public int ApplicationAliasId { get; set; }
        public string DomainAlias { get; set; }
        public Application Application { get; set; }
    }
}
