using System;
using System.Collections.Generic;
using System.Text;

namespace PCES.PaymentPlatform.DomainClasses.Classifiers
{
   public class PaymentLog
    {
        public int PaymentLogId { get; set; }
        public string Request { get; set; }
        public string Response { get; set; }
        public bool Success { get; set; }
        public string TransactionId { get; set; }
        public string UserId { get; set; }
        public string AddiionalData { get; set; }
        public DateTime? CreatedWhen { get; set; }
    }
}
