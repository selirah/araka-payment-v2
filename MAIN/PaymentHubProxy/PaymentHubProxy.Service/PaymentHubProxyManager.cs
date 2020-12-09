using log4net;
using PaymentHubProxy.Client;
using PaymentHubProxy.Contracts.DataContracts;
using PaymentHubProxy.Contracts.ServiceConracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace PaymentHubProxy.Service
{
    public class PaymentHubProxyManager : IPaymentHubProxyService
    {
        private ILog _log;

        public PaymentHubProxyManager()
        {
            log4net.Config.XmlConfigurator.Configure();
            _log = LogManager.GetLogger("PaymentHubProxyLog");
            _log.Info("PaymentHubProxy Service Started");
        }

        private PaymentHubProxyClient paymentHubProxyClient;

        public PaymentHubProxyClient PaymentHubProxyClient
        {
            get
            {
                if (paymentHubProxyClient == null)
                    paymentHubProxyClient = new PaymentHubProxyClient();
                return paymentHubProxyClient;
            }
        }


        public RespTransactionResponse PurchaseAirtime(string ContractIdentifier, string AccountNumber, decimal Amount, string BeneficiaryPhoneNumber, string PIN, string TransactionId)
        {
            try
            {
                var response = PaymentHubProxyClient.PurchaseAirtime(ContractIdentifier, AccountNumber, Amount, BeneficiaryPhoneNumber, PIN, TransactionId);

                if (response == null || response.TransactionID == null)
                {
                    _log.Error("Airtime Purchase Failed");
                    throw new FaultException<WebRequestFault>(
            new WebRequestFault
            {
                Code = PaymentHubResponseCode.ValidationError,
                Description = PaymentHubResponseCode.ValidationError.ToString(),
                Message = "Airtime Purchase Failed",
                Result = false
            }, "Airtime Purchase Failed");
                }

                return new RespTransactionResponse()
                {
                    OriginatingTransactionID = response.OriginatingTransactionID,
                    TransactionID = response.TransactionID,
                    Status = response.Status
                };
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                throw ex;
            }
        }


        public RespTransactionResponse VodacomBankToWallet(string AccountNumber, decimal Amount, string BeneficiaryPhoneNumber, string TransactionID, string Currency, string PIN)
        {
            try
            {
                var response = PaymentHubProxyClient.VodacomBankToWallet(AccountNumber, Amount, BeneficiaryPhoneNumber, TransactionID, Currency, PIN);

                if (response == null || response.TransactionID == null)
                {
                    _log.Error("Vodacom B2W Failed");
                    throw new FaultException<WebRequestFault>(
            new WebRequestFault
            {
                Code = PaymentHubResponseCode.ValidationError,
                Description = PaymentHubResponseCode.ValidationError.ToString(),
                Message = "Vodacom B2W Failed",
                Result = false
            }, "Vodacom B2W Failed");
                }

                return new RespTransactionResponse()
                {
                    OriginatingTransactionID = response.OriginatingTransactionID,
                    TransactionID = response.TransactionID,
                    Status = response.Status
                };
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                throw ex;
            }
        }


        public RespCanalPlusCheckAccountReturn CanalPlusCheckAccountOffer(string CardNumber, string TransactionReference)
        {
            try
            {
                var response = PaymentHubProxyClient.CanalPlusCheckAccountOffer(CardNumber, TransactionReference);

                if (response == null || string.IsNullOrEmpty(response.SubscriberNumber))
                {
                    _log.Error("Canal Offers Failed");
                    throw new FaultException<WebRequestFault>(
            new WebRequestFault
            {
                Code = PaymentHubResponseCode.ValidationError,
                Description = PaymentHubResponseCode.ValidationError.ToString(),
                Message = "Canal Offers Failed",
                Result = false
            }, "Canal Offers Failed");
                }

                List<Offer> offers = new List<Offer>();

                foreach (var offer in response.Offerslist.ToList())
                {
                    offers.Add(new Offer { Code = offer.Code, Label = offer.Label });
                }

                return new RespCanalPlusCheckAccountReturn()
                {
                    SubscriberNumber = response.SubscriberNumber,
                    ContractNumber = response.ContractNumber,
                    TokenId = response.TokenId,
                    Offerslist = offers.ToArray(),
                    Currency = response.Currency,
                    ReturnCode = response.ReturnCode,
                    AccountReference = response.AccountReference,
                    SubscriberFound = response.SubscriberFound,
                    ErrorCode = response.ErrorCode,
                    ErrorLabel = response.ErrorLabel,
                    IDBase = response.IDBase

                };
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                throw ex;
            }
        }

        public List<SelectableOption> CanalPlusGetOfferOptions(string SelectedOffer)
        {
            try
            {
                var response = PaymentHubProxyClient.CanalPlusGetOfferOptions(SelectedOffer);

                if (response == null)
                {
                    _log.Error("Canal Options Failed");
                    throw new FaultException<WebRequestFault>(
            new WebRequestFault
            {
                Code = PaymentHubResponseCode.ValidationError,
                Description = PaymentHubResponseCode.ValidationError.ToString(),
                Message = "Canal Options Failed",
                Result = false
            }, "Canal Options Failed");
                }

                List<SelectableOption> selectableOptions = new List<SelectableOption>();

                foreach (var option in response)
                {
                    selectableOptions.Add(new SelectableOption { Code = option.Code, Label = option.Label });
                }

                return selectableOptions;
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                throw ex;
            }
        }

        public List<SelectableOption> CanalPlusGetOptionDurations(string SelectedOffer, string SelectedOption)
        {
            try
            {
                var response = PaymentHubProxyClient.CanalPlusGetOptionDurations(SelectedOffer, SelectedOption);

                if (response == null)
                {
                    _log.Error("Canal Durations Failed");
                    throw new FaultException<WebRequestFault>(
            new WebRequestFault
            {
                Code = PaymentHubResponseCode.ValidationError,
                Description = PaymentHubResponseCode.ValidationError.ToString(),
                Message = "Canal Durations Failed",
                Result = false
            }, "Canal Durations Failed");
                }

                List<SelectableOption> selectableDurations = new List<SelectableOption>();

                foreach (var option in response)
                {
                    selectableDurations.Add(new SelectableOption { Code = option.Code, Label = option.Label });
                }

                return selectableDurations;
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                throw ex;
            }
        }

        public RespCanalPlusVerifyRenewalOffer CanalPlusVerifyRenewalOffer(string SelectedOffer, string SelectedOption, string Duration, string ContractNumber, string SubscriberNumber, string TokenId, string TransactionReference)
        {
            try
            {
                var response = PaymentHubProxyClient.CanalPlusVerifyRenewalOffer(SelectedOffer, SelectedOption, Duration, ContractNumber, SubscriberNumber, TokenId, TransactionReference);

                if (response == null)
                {
                    _log.Error("Canal Verify Failed");
                    throw new FaultException<WebRequestFault>(
            new WebRequestFault
            {
                Code = PaymentHubResponseCode.ValidationError,
                Description = PaymentHubResponseCode.ValidationError.ToString(),
                Message = "Canal Verufy Failed",
                Result = false
            }, "Canal Verify Failed");
                }

                return new RespCanalPlusVerifyRenewalOffer()
                {
                    SubscriberNumber = response.SubscriberNumber,
                    Amount = response.Amount,
                    ContractNumber = response.ContractNumber,
                    Currency = response.Currency,
                    ExpiryDate = response.ExpiryDate

                };
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                throw ex;
            }

        }

        public RespTransactionResponse CanalPlusRegisterStandardRenewal(string SelectedOffer, string SelectedOption, string Duration, string ContractNumber, string SubscriberNumber, string SmartCardNumber, string TokenId, string PhoneNumber, string AccountNumber, decimal Amount, string PIN, string TransactionID)
        {
            try
            {
                var response = PaymentHubProxyClient.CanalPlusRegisterStandardRenewal(SelectedOffer, SelectedOption, Duration, ContractNumber, SubscriberNumber, SmartCardNumber, TokenId, PhoneNumber, AccountNumber, Amount, PIN, TransactionID);

                if (response == null || response.TransactionID == null)
                {
                    _log.Error("Canal Renewal Failed");
                    throw new FaultException<WebRequestFault>(
            new WebRequestFault
            {
                Code = PaymentHubResponseCode.ValidationError,
                Description = PaymentHubResponseCode.ValidationError.ToString(),
                Message = "Canal Renewal Failed",
                Result = false
            }, "Canal Renewal Failed");
                }

                return new RespTransactionResponse()
                {
                    OriginatingTransactionID = response.OriginatingTransactionID,
                    TransactionID = response.TransactionID,
                    Status = response.Status
                };
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                throw ex;
            }
        }

        public RespDStvGetCustomerDetails DStvGetCustomerDetails(string deviceNumber)
        {
            try
            {
                var response = PaymentHubProxyClient.DStvGetCustomerDetails(deviceNumber);

                if (response == null)
                {
                    _log.Error("DSTV Customer Details Failed");
                    throw new FaultException<WebRequestFault>(
            new WebRequestFault
            {
                Code = PaymentHubResponseCode.ValidationError,
                Description = PaymentHubResponseCode.ValidationError.ToString(),
                Message = "DSTV Customer Details Failed",
                Result = false
            }, "DSTV Customer Details Failed");
                }

                return new RespDStvGetCustomerDetails()
                {
                    CustomerNumber = response.CustomerNumber
                };
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                throw ex;
            }
        }

        public List<RespDStvGetAvailableProducts> DStvGetAvailableProducts(string CustomerNumber)
        {

            try
            {
                var response = PaymentHubProxyClient.DStvGetAvailableProducts(CustomerNumber);

                if (response == null)
                {
                    _log.Error("DSTV Packages Failed");
                    throw new FaultException<WebRequestFault>(
            new WebRequestFault
            {
                Code = PaymentHubResponseCode.ValidationError,
                Description = PaymentHubResponseCode.ValidationError.ToString(),
                Message = "DSTV Packages Failed",
                Result = false
            }, "DSTV Packages Failed");
                }

                List<RespDStvGetAvailableProducts> products = new List<RespDStvGetAvailableProducts>();

                foreach (var product in response)
                {
                    products.Add(new RespDStvGetAvailableProducts 
                    { 
                        ProductDescription=product.ProductDescription, 
                        Currency = product.Currency,
                        DefaultCurrencyCode = product.DefaultCurrencyCode,
                        DefaultCurrencyProductPrice = product.DefaultCurrencyProductPrice,
                        ProductPrice = product.ProductPrice,
                        HasCustomer = product.HasCustomer,
                        ProductCode = product.ProductCode
                    });
                }

                return products;
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                throw ex;
            }
        }

        public RespTransactionResponse DStvProcessPayment(string SmartCardNumber, string CustomerNumber, string AccountNumber, decimal Amount, string PIN, string TransactionID)
        {
            try
            {
                var response = PaymentHubProxyClient.DStvProcessPayment(SmartCardNumber, CustomerNumber, AccountNumber, Amount, PIN, TransactionID);

                if (response == null || response.TransactionID == null)
                {
                    _log.Error("DSTV Payment Failed");
                    throw new FaultException<WebRequestFault>(
            new WebRequestFault
            {
                Code = PaymentHubResponseCode.ValidationError,
                Description = PaymentHubResponseCode.ValidationError.ToString(),
                Message = "DSTV Payment Failed",
                Result = false
            }, "DSTV Payment Failed");
                }

                return new RespTransactionResponse()
                {
                    OriginatingTransactionID = response.OriginatingTransactionID,
                    TransactionID = response.TransactionID,
                    Status = response.Status
                };
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                throw ex;
            }
        }

        public RespDStvGetDueAmountAndDate DStvGetDueAmountAndDate(string SmartCardNumber)
        {
            try
            {
                var response = PaymentHubProxyClient.DStvGetDueAmountAndDate(SmartCardNumber);

                if (response == null)
                {
                    _log.Error("DSTV Due Date Failed");
                    throw new FaultException<WebRequestFault>(
            new WebRequestFault
            {
                Code = PaymentHubResponseCode.ValidationError,
                Description = PaymentHubResponseCode.ValidationError.ToString(),
                Message = "DSTV Due Date Failed",
                Result = false
            }, "DSTV Due Date Failed");
                }

                return new RespDStvGetDueAmountAndDate()
                {
                   Amount = response.Amount,
                   Currency = response.Currency,
                   DueDate = response.DueDate
                };
            }
            catch (Exception ex)
            {
                _log.Error(ex);
                throw ex;
            }
        }

    }
}

