using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentPlatform.PaymentHubProxy.DTO.Response
{
    public class RpCanalPlusCheckAccountReturn
    {
        public int ReturnCode { get; set; }
        
        public string ErrorCode { get; set; }
        
        public string ErrorLabel { get; set; }
        
        public bool SubscriberFound { get; set; }
        
        public string IDBase { get; set; }
        
        public string SubscriberNumber { get; set; }
        
        public string ContractNumber { get; set; }
        
        public string AccountReference { get; set; }
        
        public string Currency { get; set; }
        
        public string TokenId { get; set; }
        
        public Offer[] Offerslist { get; set; }
    }

    public class Offer
    {
        
        public string Code { get; set; }
        
        public string Label { get; set; }
        
        public SelectableOption[] Durations { get; set; }
        
        public SelectableOption[] OptionsList { get; set; }
    }

    public class SelectableOption
    {
        
        public string Code { get; set; }
        
        public string Label { get; set; }
    }
}
