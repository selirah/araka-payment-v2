using PaymentHubProxy.Client.Configuration.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Client.Configuration.Classes
{
   public class ProxyClientSettings : IProxyClientSettings
    {
        public string BaseAddress { get; set; }
        public string TokenEndpoint { get; set; }
        public string AirtimeEndpoint { get; set; }
        public string VodacomBankToWalletEndpoint { get; set; } 
        public string CanalAccountOffersEndpoint { get; set; }
        public string CanalAccountOptionsEndpoint { get; set; }
        public string CanalDurationsEndpoint { get; set; }
        public string CanalVerifyRenewalEndpoint { get; set; }
        public string CanalRegisterRenewalEndpoint { get; set; }
        public string DstvCustomerDetailsEndpoint { get; set; }
        public string DstvProductsEndpoint { get; set; }
        public string DstvPaymentEndpoint { get; set; }
        public string DstvDueDateEndpoint { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
