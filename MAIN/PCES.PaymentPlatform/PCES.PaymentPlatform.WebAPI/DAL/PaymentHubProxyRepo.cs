using PaymentPlatform.PaymentHubProxy;
using PaymentPlatform.PaymentHubProxy.DTO.Response;
using PCES.PaymentPlatform.Utility;
using PCES.PaymentPlatform.WebAPI.DTO.PaymentHubProxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PCES.PaymentPlatform.WebAPI.DAL
{
    public class PaymentHubProxyRepo
    {
        private PaymentHubProxyClient paymentHubProxy;

        public PaymentHubProxyClient PaymentHubProxyClient
        {
            get
            {
                if (paymentHubProxy == null)
                    paymentHubProxy = new PaymentHubProxyClient();
                return paymentHubProxy;
            }
        }

        public RpTransactionResponse VodacomBankToWalletNoTransaction(ReqSendMobileMoneyBankToWallet bankToWallet, string userId)
        {
            try
            {
                // get transactionID from Process

                // string transactonID = "";

                var response = PaymentHubProxyClient.VodacomBankToWalletNoTransaction(bankToWallet.BeneficiaryPhoneNumber, bankToWallet.Amount, bankToWallet.Currency, null);


                return response;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public RpTransactionResponse PurchaseAirtimeNoTransaction(ReqAirtelAirtimeTopup airtimeTopup, string userId)
        {
            try
            {
                // get transactionID from Process

                // string transactonID = "";

                var response = PaymentHubProxyClient.PurchaseAirtimeNoTransaction(airtimeTopup.BeneficiaryPhoneNumber, airtimeTopup.Amount, airtimeTopup.Currency, null);


                return response;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        #region Canal Plus

        public RpCanalPlusCheckAccountReturn CanalPlusCheckAccountOffer(ReqCanalAccountOffers reqCanalAccountOffers, string userId)
        {
            try
            {
                // get transactionID from Process

                // string transactonID = "";

                var response = PaymentHubProxyClient.CanalPlusCheckAccountOffer(reqCanalAccountOffers.SmartCardNumber, null);


                return response;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }


        public List<SelectableOption> CanalPlusGetOfferOptions(ReqCanalAccountOptions reqCanalAccountOptions, string userId)
        {
            try
            {
                // get transactionID from Process

                // string transactonID = "";

                var response = PaymentHubProxyClient.CanalPlusGetOfferOptions(reqCanalAccountOptions.SelectedOffer);


                return response;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public List<SelectableOption> CanalPlusGetOptionDurations(ReqCanalAccountDurations reqCanalAccountDurations, string userId)
        {
            try
            {
                // get transactionID from Process

                // string transactonID = "";

                var response = PaymentHubProxyClient.CanalPlusGetOptionDurations(reqCanalAccountDurations.SelectedOffer, reqCanalAccountDurations.SelectedOption);


                return response;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public RpCanalPlusVerifyRenewalOffer CanalPlusVerifyRenewalOffer(ReqCanalVerifyRenewal reqCanalVerifyRenewal, string userId)
        {
            try
            {
                // get transactionID from Process

                // string transactonID = "";

                var response = PaymentHubProxyClient.CanalPlusVerifyRenewalOffer(reqCanalVerifyRenewal.SelectedOffer, reqCanalVerifyRenewal.SelectedOption, reqCanalVerifyRenewal.Duration, reqCanalVerifyRenewal.ContractNumber, reqCanalVerifyRenewal.SubscriberNumber, reqCanalVerifyRenewal.TokenId, null);


                return response;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public RpTransactionResponse CanalPlusRegisterStandardRenewalNoTransaction(ReqCanalRegisterStandardRenewal reqCanalRegisterStandard, string userId)
        {
            try
            {
                // get transactionID from Process

                // string transactonID = "";

                var response = PaymentHubProxyClient.CanalPlusRegisterStandardRenewalNoTransaction(reqCanalRegisterStandard.SelectedOffer, reqCanalRegisterStandard.SelectedOption, reqCanalRegisterStandard.Duration, reqCanalRegisterStandard.ContractNumber, reqCanalRegisterStandard.SubscriberNumber, reqCanalRegisterStandard.SmartCardNumber, reqCanalRegisterStandard.TokenId, reqCanalRegisterStandard.PhoneNumber, reqCanalRegisterStandard.Amount, reqCanalRegisterStandard.Currency, null);


                return response;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }


        #endregion

        #region DSTV

        public RpDStvGetCustomerDetails DStvGetCustomerDetails(ReqDstvCustomerDetails reqDstvCustomerDetails, string userId)
        {
            try
            {
                // get transactionID from Process

                // string transactonID = "";

                var response = PaymentHubProxyClient.DStvGetCustomerDetails(reqDstvCustomerDetails.SmartCardNumber);


                return response;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public List<RpDStvGetAvailableProducts> DStvGetAvailableProducts(ReqDstvGetProducts reqDstvGetProducts, string userId)
        {
            try
            {
                // get transactionID from Process

                // string transactonID = "";

                var response = PaymentHubProxyClient.DStvGetAvailableProducts(reqDstvGetProducts.CustomerNumber);


                return response;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public RpTransactionResponse DStvProcessPaymentNoTransaction(ReqDstvPayment reqDstvGetProducts, string userId)
        {
            try
            {
                // get transactionID from Process

                // string transactonID = "";

                var response = PaymentHubProxyClient.DStvProcessPaymentNoTransaction(reqDstvGetProducts.SmartCardNumber, reqDstvGetProducts.CustomerNumber, reqDstvGetProducts.Amount, reqDstvGetProducts.Currency, null);


                return response;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }


        public RpDStvGetDueAmountAndDate DStvGetDueAmountAndDate(ReqDstvDueDate reqDstvDueDate, string userId)
        {
            try
            {
                // get transactionID from Process

                // string transactonID = "";

                var response = PaymentHubProxyClient.DStvGetDueAmountAndDate(reqDstvDueDate.SmartCardNumber);


                return response;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }


        #endregion
    }
}
