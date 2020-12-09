using System;

namespace PCES.PaymentPlatform.DomainClasses.Classifiers
{
    public class Culture
    {
        public int CultureId { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public DateTime LastModifiedWhen { get; set; }
        public string Alias { get; set; }
        public bool IsEnabled { get; set; }
        public string Code { get; set; }

        public string CultureCode
        {
            get
            {
                if (Code != null)
                {
                    var codeArr  = Code.Split("-");

                    return codeArr[0].ToUpper();
                }
                return null;
            }
        }

    }
}
