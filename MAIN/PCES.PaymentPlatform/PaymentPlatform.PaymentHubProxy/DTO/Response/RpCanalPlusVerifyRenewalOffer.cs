using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentPlatform.PaymentHubProxy.DTO.Response
{
   public class RpCanalPlusVerifyRenewalOffer
    {
        
        public string SubscriberNumber { get; set; }
        
        public string ContractNumber { get; set; }
        
        public decimal Amount { get; set; }
        
        public string ExpiryDate { get; set; }
        
        public string Currency { get; set; }
        
        public RespCanalPlusCodeLabel MainOffer { get; set; }
        
        public RespCanalPlusCodeLabel Duration { get; set; }
        public RespCanalPlusCodeLabel[] OfferList { get; set; }
    }

    public class RespCanalPlusCodeLabel
    {
        
        public string Code { get; set; }
        
        public string Label { get; set; }
    }
}
