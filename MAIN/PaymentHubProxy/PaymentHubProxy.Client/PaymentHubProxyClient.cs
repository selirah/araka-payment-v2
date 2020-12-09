using log4net;
using Newtonsoft.Json;
using PaymentHubProxy.Client.Configuration.Interfaces;
using PaymentHubProxy.Client.Request;
using PaymentHubProxy.Client.Response;
using PaymentHubProxy.Utility;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace PaymentHubProxy.Client
{
    public class PaymentHubProxyClient
    {
        private ILog _log;
        public PaymentHubProxyClient()
        {
            log4net.Config.XmlConfigurator.Configure();
            _log = LogManager.GetLogger("PaymentHubProxyLog");
            ServicePointManager.ServerCertificateValidationCallback +=
   (sender, cert, chain, sslPolicyErrors) => true;
            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls
                   | SecurityProtocolType.Tls11
                   | SecurityProtocolType.Tls12
                   | SecurityProtocolType.Ssl3;
        }

        private static IProxyClientSettings _proxyClientSettings;

        public static IProxyClientSettings ProxyClientSettings
        {
            get
            {
                if (_proxyClientSettings == null)
                    _proxyClientSettings = ConfigurationSection.GetSection<IProxyClientSettings>();
                return _proxyClientSettings;
            }
        }



        public TokenResponse GetToken()
        {
            var tokenParams = new Dictionary<string, string>
               {
                   {"grant_type", "password"},
                   {"username", ProxyClientSettings.Username},
                   {"password", ProxyClientSettings.Password},
               };

            HttpClient client = new HttpClient();

            using (HttpResponseMessage response = client.PostAsync(ProxyClientSettings.BaseAddress + ProxyClientSettings.TokenEndpoint, new FormUrlEncodedContent(tokenParams)).Result)
            using (HttpContent content = response.Content)
            using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
            {
                string result = sr.ReadToEnd();

                _log.Info(string.Format("TOKEN response: {0}", result));

                TokenResponse tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(result);

                return tokenResponse;

            }
        }


        public RpTransactionResponse VodacomBankToWallet(string AccountNumber, decimal Amount, string BeneficiaryPhoneNumber, string TransactionID, string Currency, string PIN)
        {
            var token = GetToken();

            if (token == null || string.IsNullOrEmpty(token.access_token))
            {
                throw new Exception("Token Authentication Failed");
            }

            var request = new RqSendMobileMoneyBankToWallet()
            {
                AccountNumber = AccountNumber,
                Amount = Amount,
                BeneficiaryPhoneNumber = BeneficiaryPhoneNumber,
                Currency = Currency,
                TransactionID = TransactionID,
                PIN = PIN
            };


            HttpClient client = new HttpClient();

            var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            _log.Info(string.Format("Vodacom BankToWallet request: {0}", JsonConvert.SerializeObject(request)));

            client.BaseAddress = new Uri(ProxyClientSettings.BaseAddress);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

            using (HttpResponseMessage response = client.PostAsync(ProxyClientSettings.BaseAddress + ProxyClientSettings.VodacomBankToWalletEndpoint, payload).Result)

            using (HttpContent content = response.Content)

            using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
            {
                string result = sr.ReadToEnd();
                _log.Info(string.Format("Vodacom BankToWallet response: {0}", result));

                var res = JsonConvert.DeserializeObject<RpTransactionResponse>(result);

                return res;
            }

        }


        public RpTransactionResponse PurchaseAirtime(string ContractIdentifier, string AccountNumber, decimal Amount, string BeneficiaryPhoneNumber, string PIN, string TransactionId)
        {
            var token = GetToken();

            if (token == null || string.IsNullOrEmpty(token.access_token))
            {
                throw new Exception("Token Authentication Failed");
            }

            var request = new RqAirtelAirtimeTopup()
            {
                AccountNumber = AccountNumber,
                ContractIdentifier = ContractIdentifier,
                Amount = Amount,
                BeneficiaryPhoneNumber = BeneficiaryPhoneNumber,
                TransactionId = TransactionId,
                PIN = PIN
            };

            HttpClient client = new HttpClient();

            var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            _log.Info(string.Format("Airtime Topup request: {0}", JsonConvert.SerializeObject(request)));

            client.BaseAddress = new Uri(ProxyClientSettings.BaseAddress);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

            using (HttpResponseMessage response = client.PostAsync(ProxyClientSettings.BaseAddress + ProxyClientSettings.AirtimeEndpoint, payload).Result)

            using (HttpContent content = response.Content)

            using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
            {
                string result = sr.ReadToEnd();
                _log.Info(string.Format("Airtime Topup response: {0}", result));

                var res = JsonConvert.DeserializeObject<RpTransactionResponse>(result);

                return res;
            }

        }



        #region CANAL PLUS

        public RpCanalPlusCheckAccountReturn CanalPlusCheckAccountOffer(string CardNumber, string TransactionReference)
        {
            var token = GetToken();

            if (token == null || string.IsNullOrEmpty(token.access_token))
            {
                throw new Exception("Token Authentication Failed");
            }


            var request = new RqCanalPlusGetCustomerDetails()
            {
                CardNumber = CardNumber,
                TransactionReference = TransactionReference
            };

            HttpClient client = new HttpClient();

            var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            _log.Info(string.Format("Canal Account offers request: {0}", JsonConvert.SerializeObject(request)));

            client.BaseAddress = new Uri(ProxyClientSettings.BaseAddress);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

            using (HttpResponseMessage response = client.PostAsync(ProxyClientSettings.BaseAddress + ProxyClientSettings.CanalAccountOffersEndpoint, payload).Result)

            using (HttpContent content = response.Content)

            using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
            {
                string result = sr.ReadToEnd();
                _log.Info(string.Format("Canal Account offers response: {0}", result));

                var res = JsonConvert.DeserializeObject<RpCanalPlusCheckAccountReturn>(result);

                return res;
            }
        }


        public List<SelectableOption> CanalPlusGetOfferOptions(string SelectedOffer)
        {
            var token = GetToken();

            if (token == null || string.IsNullOrEmpty(token.access_token))
            {
                throw new Exception("Token Authentication Failed");
            }


            var request = new RqCanalPlus()
            {
                SelectedOffer = SelectedOffer
            };

            HttpClient client = new HttpClient();

            var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            _log.Info(string.Format("Canal Plus options request: {0}", JsonConvert.SerializeObject(request)));

            client.BaseAddress = new Uri(ProxyClientSettings.BaseAddress);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

            using (HttpResponseMessage response = client.PostAsync(ProxyClientSettings.BaseAddress + ProxyClientSettings.CanalAccountOptionsEndpoint, payload).Result)

            using (HttpContent content = response.Content)

            using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
            {
                string result = sr.ReadToEnd();
                _log.Info(string.Format("Canal Plus options response: {0}", result));

                var res = JsonConvert.DeserializeObject<List<SelectableOption>>(result);

                return res;
            }
        }

        public List<SelectableOption> CanalPlusGetOptionDurations(string SelectedOffer, string SelectedOption)
        {
            var token = GetToken();

            if (token == null || string.IsNullOrEmpty(token.access_token))
            {
                throw new Exception("Token Authentication Failed");
            }


            var request = new RqCanalPlus()
            {
                SelectedOffer = SelectedOffer,
                SelectedOption = SelectedOption
            };

            HttpClient client = new HttpClient();

            var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            _log.Info(string.Format("Canal plus durations request: {0}", JsonConvert.SerializeObject(request)));

            client.BaseAddress = new Uri(ProxyClientSettings.BaseAddress);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

            using (HttpResponseMessage response = client.PostAsync(ProxyClientSettings.BaseAddress + ProxyClientSettings.CanalDurationsEndpoint, payload).Result)

            using (HttpContent content = response.Content)

            using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
            {
                string result = sr.ReadToEnd();
                _log.Info(string.Format("Canal plus durations response: {0}", result));

                var res = JsonConvert.DeserializeObject<List<SelectableOption>>(result);

                return res;
            }
        }


        public RpCanalPlusVerifyRenewalOffer CanalPlusVerifyRenewalOffer(string SelectedOffer, string SelectedOption, string Duration, string ContractNumber, string SubscriberNumber, string TokenId, string TransactionReference)
        {
            var token = GetToken();

            if (token == null || string.IsNullOrEmpty(token.access_token))
            {
                throw new Exception("Token Authentication Failed");
            }

            var request = new RqCanalPlus()
            {
                SelectedOffer = SelectedOffer,
                SelectedOption = SelectedOption,
                ContractNumber = ContractNumber,
                Duration = Duration,
                SubscriberNumber = SubscriberNumber,
                TokenId = TokenId,
                TransactionReference = TransactionReference
            };

            HttpClient client = new HttpClient();

            var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            _log.Info(string.Format("Canal plus verify request: {0}", JsonConvert.SerializeObject(request)));

            client.BaseAddress = new Uri(ProxyClientSettings.BaseAddress);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

            using (HttpResponseMessage response = client.PostAsync(ProxyClientSettings.BaseAddress + ProxyClientSettings.CanalVerifyRenewalEndpoint, payload).Result)

            using (HttpContent content = response.Content)

            using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
            {
                string result = sr.ReadToEnd();
                _log.Info(string.Format("Canal plus verify response: {0}", result));

                var res = JsonConvert.DeserializeObject<RpCanalPlusVerifyRenewalOffer>(result);

                return res;
            }
        }

        public RpTransactionResponse CanalPlusRegisterStandardRenewal(string SelectedOffer, string SelectedOption, string Duration, string ContractNumber, string SubscriberNumber, string SmartCardNumber, string TokenId, string PhoneNumber, string AccountNumber, decimal Amount, string PIN, string TransactionID)
        {
            var token = GetToken();

            if (token == null || string.IsNullOrEmpty(token.access_token))
            {
                throw new Exception("Token Authentication Failed");
            }

            var request = new RqCanalPlus()
            {
                SelectedOffer = SelectedOffer,
                SelectedOption = SelectedOption,
                ContractNumber = ContractNumber,
                Duration = Duration,
                SubscriberNumber = SubscriberNumber,
                TokenId = TokenId,
                AccountNumber = AccountNumber,
                Amount = Amount,
                SmartCardNumber = SmartCardNumber,
                PhoneNumber = PhoneNumber,
                PIN = PIN,
                TransactionID = TransactionID,

            };

            HttpClient client = new HttpClient();

            var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            _log.Info(string.Format("Canal Plus Renewal request: {0}", JsonConvert.SerializeObject(request)));


            client.BaseAddress = new Uri(ProxyClientSettings.BaseAddress);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

            using (HttpResponseMessage response = client.PostAsync(ProxyClientSettings.BaseAddress + ProxyClientSettings.CanalRegisterRenewalEndpoint, payload).Result)

            using (HttpContent content = response.Content)

            using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
            {
                string result = sr.ReadToEnd();
                _log.Info(string.Format("Canal Plus Renewal response: {0}", result));

                var res = JsonConvert.DeserializeObject<RpTransactionResponse>(result);

                return res;
            }
        }

        #endregion


        #region DSTV

        public RpDStvGetCustomerDetails DStvGetCustomerDetails(string deviceNumber)
        {
            var token = GetToken();

            if (token == null || string.IsNullOrEmpty(token.access_token))
            {
                throw new Exception("Token Authentication Failed");
            }

            var request = new RqDStv()
            {
                deviceNumber = deviceNumber
            };

            HttpClient client = new HttpClient();

            var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            _log.Info(string.Format("DSTV Customer Details request: {0}", JsonConvert.SerializeObject(request)));

            client.BaseAddress = new Uri(ProxyClientSettings.BaseAddress);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

            using (HttpResponseMessage response = client.PostAsync(ProxyClientSettings.BaseAddress + ProxyClientSettings.DstvCustomerDetailsEndpoint, payload).Result)

            using (HttpContent content = response.Content)

            using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
            {
                string result = sr.ReadToEnd();
                _log.Info(string.Format("DSTV Customer Details response: {0}", result));

                var res = JsonConvert.DeserializeObject<RpDStvGetCustomerDetails>(result);

                return res;
            }
        }

        public List<RpDStvGetAvailableProducts> DStvGetAvailableProducts(string CustomerNumber)
        {
            var token = GetToken();

            if (string.IsNullOrEmpty(token.access_token))
            {
                throw new Exception("Token Authentication Failed");
            }

            var request = new RqDStv()
            {
                CustomerNumber = CustomerNumber
            };

            HttpClient client = new HttpClient();

            var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            _log.Info(string.Format("DSTV Products request: {0}", JsonConvert.SerializeObject(request)));


            client.BaseAddress = new Uri(ProxyClientSettings.BaseAddress);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

            using (HttpResponseMessage response = client.PostAsync(ProxyClientSettings.BaseAddress + ProxyClientSettings.DstvProductsEndpoint, payload).Result)

            using (HttpContent content = response.Content)

            using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
            {
                string result = sr.ReadToEnd();
                _log.Info(string.Format("DSTV Products response: {0}", result));

                var res = JsonConvert.DeserializeObject<List<RpDStvGetAvailableProducts>>(result);

                return res;
            }
        }


        public RpTransactionResponse DStvProcessPayment(string SmartCardNumber, string CustomerNumber, string AccountNumber, decimal Amount, string PIN, string TransactionID)
        {
            var token = GetToken();

            if (token == null || string.IsNullOrEmpty(token.access_token))
            {
                throw new Exception("Token Authentication Failed");
            }

            var request = new RqDStv()
            {
                CustomerNumber = CustomerNumber,
                SmartCardNumber = SmartCardNumber,
                AccountNumber = AccountNumber,
                Amount = Amount,
                PIN = PIN,
                TransactionID = TransactionID
            };

            HttpClient client = new HttpClient();

            var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            _log.Info(string.Format("DSTV Payment request: {0}", JsonConvert.SerializeObject(request)));

            client.BaseAddress = new Uri(ProxyClientSettings.BaseAddress);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

            using (HttpResponseMessage response = client.PostAsync(ProxyClientSettings.BaseAddress + ProxyClientSettings.DstvPaymentEndpoint, payload).Result)

            using (HttpContent content = response.Content)

            using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
            {
                string result = sr.ReadToEnd();
                _log.Info(string.Format("DSTV Payment response: {0}", result));

                var res = JsonConvert.DeserializeObject<RpTransactionResponse>(result);

                return res;
            }
        }


        public RpDStvGetDueAmountAndDate DStvGetDueAmountAndDate(string SmartCardNumber)
        {
            var token = GetToken();

            if (token == null || string.IsNullOrEmpty(token.access_token))
            {
                throw new Exception("Token Authentication Failed");
            }

            var request = new RqDStv()
            {
                SmartCardNumber = SmartCardNumber,
            };

            HttpClient client = new HttpClient();

            var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            _log.Info(string.Format("DSTV Payment request: {0}", JsonConvert.SerializeObject(request)));

            client.BaseAddress = new Uri(ProxyClientSettings.BaseAddress);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

            using (HttpResponseMessage response = client.PostAsync(ProxyClientSettings.BaseAddress + ProxyClientSettings.DstvDueDateEndpoint, payload).Result)

            using (HttpContent content = response.Content)

            using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
            {
                string result = sr.ReadToEnd();
                _log.Info(string.Format("DSTV Payment response: {0}", result));

                var res = JsonConvert.DeserializeObject<RpDStvGetDueAmountAndDate>(result);

                return res;
            }
        }

        #endregion


    }
}
