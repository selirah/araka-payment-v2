using Newtonsoft.Json;
using PaymentPlatform.PaymentHubProxy.DTO.Request;
using PaymentPlatform.PaymentHubProxy.DTO.Response;
using PCES.PaymentPlatform.Repository.Application;
using PCES.PaymentPlatform.Utility;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PaymentPlatform.PaymentHubProxy
{
    public class PaymentHubProxyClient
    {
        public PaymentHubProxyClient()
        {
            ServicePointManager.ServerCertificateValidationCallback +=
   (sender, cert, chain, sslPolicyErrors) => true;
            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls
                   | SecurityProtocolType.Tls11
                   | SecurityProtocolType.Tls12
                   | SecurityProtocolType.Tls13;
        }

        string strRequest = "";
        string strResponse = "";

        private static ConfigSettings _configSettings;

        public static ConfigSettings ConfigSettings
        {
            get
            {
                if (_configSettings == null)
                    _configSettings = new ConfigSettings();
                return _configSettings;
            }
        }



        public TokenResponse GetToken()
        {
            try
            {
                var tokenParams = new Dictionary<string, string>
               {
                   {"grant_type", "password"},
                   {"username", ConfigSettings.Username},
                   {"password", ConfigSettings.Password},
               };

                HttpClient client = new HttpClient();

                using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.TokenEndpoint, new FormUrlEncodedContent(tokenParams)).Result)
                using (HttpContent content = response.Content)
                using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                {
                    string result = sr.ReadToEnd();

                    Logger.Info(string.Format("TOKEN response: {0}", result));

                    TokenResponse tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(result);

                    return tokenResponse;
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);
                throw ex;
            }
        }


        public RpTransactionResponse VodacomBankToWallet(string BeneficiaryPhoneNumber, decimal Amount, string Currency, string TransactionID)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                var request = new RqSendMobileMoneyBankToWallet()
                {
                    Amount = Amount,
                    BeneficiaryPhoneNumber = BeneficiaryPhoneNumber,
                    Currency = Currency,
                    TransactionID = TransactionID
                };

                var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                Logger.Info(string.Format("Vodacom BankToWallet request: {0}", JsonConvert.SerializeObject(request)));

                strRequest = JsonConvert.SerializeObject(request);

                ApplicationRepository db = new ApplicationRepository();

                try
                {
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.VodacomBankToWalletEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("Vodacom BankToWallet response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<RpTransactionResponse>(strResponse);

                        if (res != null || !string.IsNullOrEmpty(res.TransactionID))
                        {
                            db.SavePaymentLog(strRequest, strResponse, true, TransactionID, null, ConfigSettings.Username);
                        }
                        else
                        {
                            db.SavePaymentLog(strRequest, strResponse, false, TransactionID, null, ConfigSettings.Username);
                        }

                        return res;
                    }

                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, TransactionID, ex.Message, ConfigSettings.Username);
                    throw ex;
                }
            }
            else
            {
                return new RpTransactionResponse()
                {
                    OriginatingTransactionID = "775839",
                    TransactionID = "1093840",
                    Status = "Success"
                };
            }

        }

        public RpTransactionResponse VodacomBankToWalletNoTransaction(string BeneficiaryPhoneNumber, decimal Amount, string Currency, string TransactionID)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                var request = new RqSendMobileMoneyBankToWallet()
                {
                    Amount = Amount,
                    BeneficiaryPhoneNumber = BeneficiaryPhoneNumber,
                    Currency = Currency,
                    TransactionID = TransactionID
                };

                var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                Logger.Info(string.Format("Vodacom BankToWallet request: {0}", JsonConvert.SerializeObject(request)));

                strRequest = JsonConvert.SerializeObject(request);

                ApplicationRepository db = new ApplicationRepository();

                try
                {
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.VodacomBankToWalletNoTransEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("Vodacom BankToWallet response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<RpTransactionResponse>(strResponse);

                        if (res != null || !string.IsNullOrEmpty(res.TransactionID))
                        {
                            db.SavePaymentLog(strRequest, strResponse, true, TransactionID, null, ConfigSettings.Username);
                        }
                        else
                        {
                            db.SavePaymentLog(strRequest, strResponse, false, TransactionID, null, ConfigSettings.Username);
                        }

                        return res;
                    }

                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, TransactionID, ex.Message, ConfigSettings.Username);
                    throw ex;
                }
            }
            else
            {
                return new RpTransactionResponse()
                {
                    OriginatingTransactionID = "775839",
                    TransactionID = "1093840",
                    Status = "Success"
                };
            }

        }

        public RpTransactionResponse PurchaseAirtimeNoTransaction(string BeneficiaryPhoneNumber, decimal Amount, string Currency, string TransactionReference)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                var request = new RqAirtelAirtimeTopup()
                {
                    Amount = Amount,
                    BeneficiaryPhoneNumber = BeneficiaryPhoneNumber,
                    TransactionReference = TransactionReference,
                    Currency = Currency
                };


                var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                Logger.Info(string.Format("Airtime Topup request: {0}", JsonConvert.SerializeObject(request)));

                strRequest = JsonConvert.SerializeObject(request);

                ApplicationRepository db = new ApplicationRepository();

                try
                {
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.AirtimeNoTransEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("Airtime Topup response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<RpTransactionResponse>(strResponse);

                        if (res != null || !string.IsNullOrEmpty(res.TransactionID))
                        {
                            db.SavePaymentLog(strRequest, strResponse, true, TransactionReference, null, ConfigSettings.Username);
                        }
                        else
                        {
                            db.SavePaymentLog(strRequest, strResponse, false, TransactionReference, null, ConfigSettings.Username);
                        }

                        return res;
                    }
                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, TransactionReference, ex.Message, ConfigSettings.Username);
                    throw ex;
                }
            }
            else
            {
                return new RpTransactionResponse()
                {
                    OriginatingTransactionID = "75289",
                    TransactionID = "32874",
                    Status = "Success"
                };
            }

        }

        public RpTransactionResponse PurchaseAirtime(string BeneficiaryPhoneNumber, decimal Amount, string Currency, string TransactionReference)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                var request = new RqAirtelAirtimeTopup()
                {
                    Amount = Amount,
                    BeneficiaryPhoneNumber = BeneficiaryPhoneNumber,
                    TransactionReference = TransactionReference,
                    Currency = Currency
                };


                var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                Logger.Info(string.Format("Airtime Topup request: {0}", JsonConvert.SerializeObject(request)));

                strRequest = JsonConvert.SerializeObject(request);

                ApplicationRepository db = new ApplicationRepository();

                try
                {
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.AirtimeEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("Airtime Topup response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<RpTransactionResponse>(strResponse);

                        if (res != null || !string.IsNullOrEmpty(res.TransactionID))
                        {
                            db.SavePaymentLog(strRequest, strResponse, true, TransactionReference, null, ConfigSettings.Username);
                        }
                        else
                        {
                            db.SavePaymentLog(strRequest, strResponse, false, TransactionReference, null, ConfigSettings.Username);
                        }

                        return res;
                    }
                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, TransactionReference, ex.Message, ConfigSettings.Username);
                    throw ex;
                }
            }
            else
            {
                return new RpTransactionResponse()
                {
                    OriginatingTransactionID = "75289",
                    TransactionID = "32874",
                    Status = "Success"
                };
            }

        }



        #region CANAL PLUS

        public RpCanalPlusCheckAccountReturn CanalPlusCheckAccountOffer(string CardNumber, string TransactionReference)
        {
            if (ConfigSettings.EnableIntegrations)
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

                var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                Logger.Info(string.Format("Canal Account offers request: {0}", JsonConvert.SerializeObject(request)));

                strRequest = JsonConvert.SerializeObject(request);

                ApplicationRepository db = new ApplicationRepository();

                try
                {
                    HttpClient client = new HttpClient();

                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.CanalAccountOffersEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("Canal Account offers response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<RpCanalPlusCheckAccountReturn>(strResponse);

                        db.SavePaymentLog(strRequest, strResponse, true, TransactionReference, null, ConfigSettings.Username);

                        return res;
                    }
                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, TransactionReference, ex.Message, ConfigSettings.Username);
                    throw ex;
                }
            }
            else
            {
               return new RpCanalPlusCheckAccountReturn { ContractNumber = "123455", Currency = "USD", SubscriberNumber = "987664", TokenId = "1234567", Offerslist = new Offer[] { new Offer { Code = "41M5EVP|EVPDD", Label = "EVASION+" }, new Offer { Code = "41M4ACP|ACPDD", Label = "ACCESS+" }, new Offer { Code = "41M2EV|EVDD", Label = "EVASION" }, new Offer { Code = "41M3CP|CPDD", Label = "ESSENTIEL+" }, new Offer { Code = "41MIRO|IROKODD", Label = "IROKO+" } } };
            }
        }


        public List<SelectableOption> CanalPlusGetOfferOptions(string SelectedOffer)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                ApplicationRepository db = new ApplicationRepository();

                try
                {
                    var request = new RqCanalPlus()
                    {
                        SelectedOffer = SelectedOffer
                    };

                    var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                    Logger.Info(string.Format("Canal Plus options request: {0}", JsonConvert.SerializeObject(request)));

                    strRequest = JsonConvert.SerializeObject(request);

                    HttpClient client = new HttpClient();

                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.CanalAccountOptionsEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("Canal Plus options response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<List<SelectableOption>>(strResponse);

                        db.SavePaymentLog(strRequest, strResponse, true, null, null, ConfigSettings.Username);

                        return res;
                    }
                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, null, ex.Message, ConfigSettings.Username);
                    throw ex;
                }
            }
            else
            {
                return new List<SelectableOption>() { new SelectableOption() { Label = "CHARME", Code = "CHR1" } };
            }
        }

        public List<SelectableOption> CanalPlusGetOptionDurations(string SelectedOffer, string SelectedOption)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                ApplicationRepository db = new ApplicationRepository();

                try
                {
                    var request = new RqCanalPlus()
                    {
                        SelectedOffer = SelectedOffer,
                        SelectedOption = SelectedOption
                    };


                    var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                    Logger.Info(string.Format("Canal plus durations request: {0}", JsonConvert.SerializeObject(request)));

                    strRequest = JsonConvert.SerializeObject(request);

                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.CanalDurationsEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("Canal plus durations response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<List<SelectableOption>>(strResponse);

                        db.SavePaymentLog(strRequest, strResponse, true, null, null, ConfigSettings.Username);

                        return res;
                    }
                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, null, ex.Message, ConfigSettings.Username);
                    throw ex;
                }
            }
            else
            {
                return new List<SelectableOption>() { new SelectableOption { Code = "0290", Label = "3 months" }, new SelectableOption { Code = "0203", Label = "6 months" }, new SelectableOption { Code = "0203", Label = "6 months" }, new SelectableOption { Code = "0203", Label = "6 months" }, new SelectableOption { Code = "0203", Label = "6 months" }, new SelectableOption { Code = "0203", Label = "6 months" }, new SelectableOption { Code = "0203", Label = "6 months" } };
            }
        }


        public RpCanalPlusVerifyRenewalOffer CanalPlusVerifyRenewalOffer(string SelectedOffer, string SelectedOption, string Duration, string ContractNumber, string SubscriberNumber, string TokenId, string TransactionReference)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                ApplicationRepository db = new ApplicationRepository();

                try
                {
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

                    var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                    Logger.Info(string.Format("Canal plus verify request: {0}", JsonConvert.SerializeObject(request)));

                    strRequest = JsonConvert.SerializeObject(request);

                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.CanalVerifyRenewalEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("Canal plus verify response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<RpCanalPlusVerifyRenewalOffer>(strResponse);

                        db.SavePaymentLog(strRequest, strResponse, true, TransactionReference, null, ConfigSettings.Username);

                        return res;
                    }
                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, TransactionReference, ex.Message, ConfigSettings.Username);
                    throw ex;
                }
            }
            else
            {
                return new RpCanalPlusVerifyRenewalOffer() { Amount = 30, ContractNumber = "123455", Currency = "USD", SubscriberNumber = "987664", Duration = new RespCanalPlusCodeLabel { Code = "0203", Label = "6 months" }, OfferList = new RespCanalPlusCodeLabel[] { new RespCanalPlusCodeLabel { Code = "0203", Label = "Premium" } } };
            }
        }

        public RpTransactionResponse CanalPlusRegisterStandardRenewalNoTransaction(string SelectedOffer, string SelectedOption, string Duration, string ContractNumber, string SubscriberNumber, string SmartCardNumber, string TokenId, string PhoneNumber, decimal Amount, string Currency, string TransactionID)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                ApplicationRepository db = new ApplicationRepository();
                try
                {

                    var request = new RqCanalPlus()
                    {
                        SelectedOffer = SelectedOffer,
                        SelectedOption = SelectedOption,
                        ContractNumber = ContractNumber,
                        Duration = Duration,
                        SubscriberNumber = SubscriberNumber,
                        TokenId = TokenId,
                        Amount = Amount,
                        SmartCardNumber = SmartCardNumber,
                        PhoneNumber = PhoneNumber,
                        TransactionID = TransactionID,
                        Currency = Currency
                    };

                    var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                    Logger.Info(string.Format("Canal Plus Renewal request: {0}", JsonConvert.SerializeObject(request)));

                    strRequest = JsonConvert.SerializeObject(request);


                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.CanalRegisterRenewalNoTransEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("Canal Plus Renewal response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<RpTransactionResponse>(strResponse);

                        if (res != null || !string.IsNullOrEmpty(res.TransactionID))
                        {
                            db.SavePaymentLog(strRequest, strResponse, true, TransactionID, null, ConfigSettings.Username);
                        }
                        else
                        {
                            db.SavePaymentLog(strRequest, strResponse, false, TransactionID, null, ConfigSettings.Username);
                        }

                        return res;
                    }
                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, TransactionID, ex.Message, ConfigSettings.Username);
                    throw ex;
                }
            }
            else
            {
                return new RpTransactionResponse()
                {
                    OriginatingTransactionID = "563746",
                    TransactionID = "898576",
                    Status = "200"
                };
            }
        }


        public RpTransactionResponse CanalPlusRegisterStandardRenewal(string SelectedOffer, string SelectedOption, string Duration, string ContractNumber, string SubscriberNumber, string SmartCardNumber, string TokenId, string PhoneNumber, decimal Amount, string Currency, string TransactionID)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                ApplicationRepository db = new ApplicationRepository();
                try
                {

                    var request = new RqCanalPlus()
                    {
                        SelectedOffer = SelectedOffer,
                        SelectedOption = SelectedOption,
                        ContractNumber = ContractNumber,
                        Duration = Duration,
                        SubscriberNumber = SubscriberNumber,
                        TokenId = TokenId,
                        Amount = Amount,
                        SmartCardNumber = SmartCardNumber,
                        PhoneNumber = PhoneNumber,
                        TransactionID = TransactionID,
                        Currency = Currency
                    };

                    var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                    Logger.Info(string.Format("Canal Plus Renewal request: {0}", JsonConvert.SerializeObject(request)));

                    strRequest = JsonConvert.SerializeObject(request);


                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.CanalRegisterRenewalEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("Canal Plus Renewal response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<RpTransactionResponse>(strResponse);

                        if (res != null || !string.IsNullOrEmpty(res.TransactionID))
                        {
                            db.SavePaymentLog(strRequest, strResponse, true, TransactionID, null, ConfigSettings.Username);
                        }
                        else
                        {
                            db.SavePaymentLog(strRequest, strResponse, false, TransactionID, null, ConfigSettings.Username);
                        }

                        return res;
                    }
                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, TransactionID, ex.Message, ConfigSettings.Username);
                    throw ex;
                }
            }
            else
            {
                return new RpTransactionResponse()
                {
                    OriginatingTransactionID = "563746",
                    TransactionID = "898576",
                    Status = "Success"
                };
            }
        }

        #endregion


        #region DSTV

        public RpDStvGetCustomerDetails DStvGetCustomerDetails(string deviceNumber)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                ApplicationRepository db = new ApplicationRepository();

                try
                {
                    var request = new RqDStv()
                    {
                        deviceNumber = deviceNumber
                    };


                    var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                    Logger.Info(string.Format("DSTV Customer Details request: {0}", JsonConvert.SerializeObject(request)));

                    strRequest = JsonConvert.SerializeObject(request);

                    HttpClient client = new HttpClient();

                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.DstvCustomerDetailsEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("DSTV Customer Details response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<RpDStvGetCustomerDetails>(strResponse);

                        db.SavePaymentLog(strRequest, strResponse, true, null, null, ConfigSettings.Username);

                        return res;
                    }
                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, null, ex.Message, ConfigSettings.Username);
                    throw ex;
                }
            }
            else
            {
                return new RpDStvGetCustomerDetails() { CustomerNumber = "0098765"  };
            }
        }

        public List<RpDStvGetAvailableProducts> DStvGetAvailableProducts(string CustomerNumber)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                ApplicationRepository db = new ApplicationRepository();

                try
                {
                    var request = new RqDStv()
                    {
                        CustomerNumber = CustomerNumber
                    };

                    var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                    Logger.Info(string.Format("DSTV Products request: {0}", JsonConvert.SerializeObject(request)));

                    strRequest = JsonConvert.SerializeObject(request);

                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.DstvProductsEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("DSTV Products response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<List<RpDStvGetAvailableProducts>>(strResponse);

                        db.SavePaymentLog(strRequest, strResponse, true, null, null, ConfigSettings.Username);

                        return res;
                    }
                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, null, ex.Message, ConfigSettings.Username);
                    throw;
                }
            }
            else
            {
                return new List<RpDStvGetAvailableProducts>() { new RpDStvGetAvailableProducts() { Currency = "USD", ProductDescription = "Family", ProductPrice = 10 }, new RpDStvGetAvailableProducts() { Currency = "USD", ProductDescription = "Access", ProductPrice = 5 }, new RpDStvGetAvailableProducts() { Currency = "USD", ProductDescription = "Compact", ProductPrice = 15 }, new RpDStvGetAvailableProducts() { Currency = "USD", ProductDescription = "Compact Plus", ProductPrice = 25 }, new RpDStvGetAvailableProducts() { Currency = "USD", ProductDescription = "Premium", ProductPrice = 35 }, new RpDStvGetAvailableProducts() { Currency = "USD", ProductDescription = "Premium Plus", ProductPrice = 50 }, new RpDStvGetAvailableProducts() { Currency = "USD", ProductDescription = "Special", ProductPrice = 65 } };
            }
        }


        public RpTransactionResponse DStvProcessPaymentNoTransaction(string SmartCardNumber, string CustomerNumber, decimal Amount, string Currency, string TransactionID)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                ApplicationRepository db = new ApplicationRepository();

                try
                {
                    var request = new RqDStv()
                    {
                        CustomerNumber = CustomerNumber,
                        SmartCardNumber = SmartCardNumber,
                        Currency = Currency,
                        Amount = Amount,
                        TransactionID = TransactionID
                    };

                    var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                    Logger.Info(string.Format("DSTV Payment request: {0}", JsonConvert.SerializeObject(request)));

                    strRequest = JsonConvert.SerializeObject(request);

                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.DstvPaymentNoTransEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("DSTV Payment response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<RpTransactionResponse>(strResponse);

                        if (res != null || !string.IsNullOrEmpty(res.TransactionID))
                        {
                            db.SavePaymentLog(strRequest, strResponse, true, TransactionID, null, ConfigSettings.Username);
                        }
                        else
                        {
                            db.SavePaymentLog(strRequest, strResponse, false, TransactionID, null, ConfigSettings.Username);
                        }

                        return res;
                    }
                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, TransactionID, ex.Message, ConfigSettings.Username);
                    throw;
                }
            }
            else
            {
                return new RpTransactionResponse()
                {
                    OriginatingTransactionID = "857239",
                    TransactionID = "094857",
                    Status = "Success"
                };
            }
        }


        public RpDStvGetDueAmountAndDate DStvGetDueAmountAndDate(string SmartCardNumber)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                ApplicationRepository db = new ApplicationRepository();

                try
                {
                    var request = new RqDStv()
                    {
                        SmartCardNumber = SmartCardNumber,
                    };

                    var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                    Logger.Info(string.Format("DSTV Payment request: {0}", JsonConvert.SerializeObject(request)));

                    strRequest = JsonConvert.SerializeObject(request);

                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.DstvDueDateEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("DSTV Payment response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<RpDStvGetDueAmountAndDate>(strResponse);

                        db.SavePaymentLog(strRequest, strResponse, true, null, null, ConfigSettings.Username);

                        return res;
                    }
                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, null, ex.Message, ConfigSettings.Username);
                    throw;
                }
            }
            else
            {
                return new RpDStvGetDueAmountAndDate() { Amount = 15, Currency = "USD", DueDate = DateTime.Now };
            }
        }


        public RpTransactionResponse DStvProcessPayment(string SmartCardNumber, string CustomerNumber, decimal Amount, string Currency, string TransactionID)
        {
            if (ConfigSettings.EnableIntegrations)
            {
                var token = GetToken();

                if (token == null || string.IsNullOrEmpty(token.access_token))
                {
                    throw new Exception("Token Authentication Failed");
                }

                ApplicationRepository db = new ApplicationRepository();

                try
                {
                    var request = new RqDStv()
                    {
                        CustomerNumber = CustomerNumber,
                        SmartCardNumber = SmartCardNumber,
                        Currency = Currency,
                        Amount = Amount,
                        TransactionID = TransactionID
                    };

                    var payload = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                    Logger.Info(string.Format("DSTV Payment request: {0}", JsonConvert.SerializeObject(request)));

                    strRequest = JsonConvert.SerializeObject(request);

                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(ConfigSettings.BaseAddress);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", token.access_token);

                    using (HttpResponseMessage response = client.PostAsync(ConfigSettings.BaseAddress + ConfigSettings.DstvPaymentEndpoint, payload).Result)

                    using (HttpContent content = response.Content)

                    using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                    {
                        strResponse = sr.ReadToEnd();
                        Logger.Info(string.Format("DSTV Payment response: {0}", strResponse));

                        var res = JsonConvert.DeserializeObject<RpTransactionResponse>(strResponse);

                        if (res != null || !string.IsNullOrEmpty(res.TransactionID))
                        {
                            db.SavePaymentLog(strRequest, strResponse, true, TransactionID, null, ConfigSettings.Username);
                        }
                        else
                        {
                            db.SavePaymentLog(strRequest, strResponse, false, TransactionID, null, ConfigSettings.Username);
                        }

                        return res;
                    }
                }
                catch (Exception ex)
                {
                    db.SavePaymentLog(strRequest, strResponse, false, TransactionID, ex.Message, ConfigSettings.Username);
                    throw;
                }
            }
            else
            {
                return new RpTransactionResponse()
                {
                    OriginatingTransactionID = "857239",
                    TransactionID = "094857",
                    Status = "Success"
                };
            }
        }

        #endregion


    }
}
