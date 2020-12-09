using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace PCES.PaymentPlatform.Utility
{
    public class ConfigSettings
    {
        IConfiguration configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json", true, true).Build();


        #region DbSettings

        public string PostgresConnection
        {
            get
            {
                return configuration.GetSection("ConnectionStrings").GetSection("PostgresConnection").Value;
            }
        }
        public string MSSqlConnection
        {
            get
            {
               return configuration.GetSection("ConnectionStrings").GetSection("MSSqlConnection").Value;
            }
        }

        #endregion


        #region EnableIntegrations

        public bool EnableIntegrations
        {
            get
            {
                return bool.Parse(configuration.GetSection("EnableIntegrations").Value ?? "true");
            }
        }

        public bool EnableSwagger
        {
            get
            {
                return bool.Parse(configuration.GetSection("EnableSwagger").Value ?? "false");
            }
        }

        #endregion


        #region QuipuSettings

        public string RequestEndpoint
        {
            get
            {
                return configuration.GetSection("QuipuSettings").GetSection("RequestEndpoint").Value;
            }
        }
        public string MerchantID
        {
            get
            {
                return configuration.GetSection("QuipuSettings").GetSection("MerchantID").Value;
            }
        }

        public string ApproveURL
        {
            get
            {
                return configuration.GetSection("QuipuSettings").GetSection("ApproveURL").Value;
            }
        }

        public string CancelURL
        {
            get
            {
                return configuration.GetSection("QuipuSettings").GetSection("CancelURL").Value;
            }
        }

        public string DeclineURL
        {
            get
            {
                return configuration.GetSection("QuipuSettings").GetSection("DeclineURL").Value;
            }
        }


        public string ApprovedPage
        {
            get
            {
                return configuration.GetSection("QuipuSettings").GetSection("ApprovedPage").Value;
            }
        }

        public string DeclinedPage
        {
            get
            {
                return configuration.GetSection("QuipuSettings").GetSection("DeclinedPage").Value;
            }
        }

        public string CanceledPage
        {
            get
            {
                return configuration.GetSection("QuipuSettings").GetSection("CanceledPage").Value;
            }
        }

        #endregion


        #region PaymentHubProxySettings

        public string BaseAddress
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("BaseAddress").Value;
            }
        }

        public string TokenEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("TokenEndpoint").Value;
            }
        }

        public string AirtimeEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("AirtimeEndpoint").Value;
            }
        }

        public string AirtimeNoTransEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("AirtimeNoTransEndpoint").Value;
            }
        }

        public string VodacomBankToWalletEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("VodacomBankToWalletEndpoint").Value;
            }
        }

        public string VodacomBankToWalletNoTransEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("VodacomBankToWalletNoTransEndpoint").Value;
            }
        }

        public string CanalAccountOffersEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("CanalAccountOffersEndpoint").Value;
            }
        }

        public string CanalAccountOptionsEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("CanalAccountOptionsEndpoint").Value;
            }
        }

        public string CanalDurationsEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("CanalDurationsEndpoint").Value;
            }
        }

        public string CanalVerifyRenewalEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("CanalVerifyRenewalEndpoint").Value;
            }
        }

        public string CanalRegisterRenewalEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("CanalRegisterRenewalEndpoint").Value;
            }
        }

        public string CanalRegisterRenewalNoTransEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("CanalRegisterRenewalNoTransEndpoint").Value;
            }
        }

        public string DstvCustomerDetailsEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("DstvCustomerDetailsEndpoint").Value;
            }
        }

        public string DstvProductsEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("DstvProductsEndpoint").Value;
            }
        }

        public string DstvPaymentEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("DstvPaymentEndpoint").Value;
            }
        }

        public string DstvPaymentNoTransEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("DstvPaymentNoTransEndpoint").Value;
            }
        }

        public string DstvDueDateEndpoint
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("DstvDueDateEndpoint").Value;
            }
        }

        public string Username
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("Username").Value;
            }
        }

        public string Password
        {
            get
            {
                return configuration.GetSection("PaymentHubProxySettings").GetSection("Password").Value;
            }
        }

        #endregion

    }
}
