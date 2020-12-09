using PaymentHubProxy.Contracts.DataContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace PaymentHubProxy.Contracts.ServiceConracts
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IPaymentHubProxyService
    {
        [OperationContract]
        [FaultContract(typeof(WebRequestFault))]
        RespTransactionResponse PurchaseAirtime(string ContractIdentifier, string AccountNumber, decimal Amount, string BeneficiaryPhoneNumber, string PIN, string TransactionId);
        [OperationContract]
        [FaultContract(typeof(WebRequestFault))]
        RespTransactionResponse VodacomBankToWallet(string AccountNumber, decimal Amount, string BeneficiaryPhoneNumber, string TransactionID, string Currency, string PIN);
        [OperationContract]
        [FaultContract(typeof(WebRequestFault))]
        RespCanalPlusCheckAccountReturn CanalPlusCheckAccountOffer(string CardNumber, string TransactionReference);
        [OperationContract]
        [FaultContract(typeof(WebRequestFault))]
        List<SelectableOption> CanalPlusGetOfferOptions(string SelectedOffer);
        [OperationContract]
        [FaultContract(typeof(WebRequestFault))]
        List<SelectableOption> CanalPlusGetOptionDurations(string SelectedOffer, string SelectedOption);
        [OperationContract]
        [FaultContract(typeof(WebRequestFault))]
        RespCanalPlusVerifyRenewalOffer CanalPlusVerifyRenewalOffer(string SelectedOffer, string SelectedOption, string Duration, string ContractNumber, string SubscriberNumber, string TokenId, string TransactionReference);
        [OperationContract]
        [FaultContract(typeof(WebRequestFault))]
        RespTransactionResponse CanalPlusRegisterStandardRenewal(string SelectedOffer, string SelectedOption, string Duration, string ContractNumber, string SubscriberNumber, string SmartCardNumber, string TokenId, string PhoneNumber, string AccountNumber, decimal Amount, string PIN, string TransactionID);
        [OperationContract]
        [FaultContract(typeof(WebRequestFault))]
        RespDStvGetCustomerDetails DStvGetCustomerDetails(string deviceNumber);
        [OperationContract]
        [FaultContract(typeof(WebRequestFault))]
        List<RespDStvGetAvailableProducts> DStvGetAvailableProducts(string CustomerNumber);
        [OperationContract]
        [FaultContract(typeof(WebRequestFault))]
        RespTransactionResponse DStvProcessPayment(string SmartCardNumber, string CustomerNumber, string AccountNumber, decimal Amount, string PIN, string TransactionID);
        [OperationContract]
        [FaultContract(typeof(WebRequestFault))]
        RespDStvGetDueAmountAndDate DStvGetDueAmountAndDate(string SmartCardNumber);

    }
}
