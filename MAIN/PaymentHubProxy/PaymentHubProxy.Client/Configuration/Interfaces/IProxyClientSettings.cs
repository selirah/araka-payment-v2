using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Client.Configuration.Interfaces
{
   public interface IProxyClientSettings
    {
         string BaseAddress { get; set; }
         string TokenEndpoint { get; set; }
         string AirtimeEndpoint { get; set; }
         string VodacomBankToWalletEndpoint { get; set; }
         string CanalAccountOffersEndpoint { get; set; }
         string CanalAccountOptionsEndpoint { get; set; }
         string CanalDurationsEndpoint { get; set; }
         string CanalVerifyRenewalEndpoint { get; set; }
         string CanalRegisterRenewalEndpoint { get; set; }
         string DstvCustomerDetailsEndpoint { get; set; }
         string DstvProductsEndpoint { get; set; }
         string DstvPaymentEndpoint { get; set; }
         string DstvDueDateEndpoint { get; set; }
         string Username { get; set; }
         string Password { get; set; }
    }
}
