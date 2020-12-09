using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using PCES.PaymentPlatform.Quipu.DTO.Response;
using PCES.PaymentPlatform.Repository.Application;
using PCES.PaymentPlatform.WebAPI.DTO.Quipu;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace PCES.PaymentPlatform.WebAPI.DAL
{
    public class PCESRequestHandler
    {
        public string Payload { get; set; }
        public string Username { get; set; }
        public PCESRequestHandler()
        {

        }
        public PCESRequestHandler(string requestBody, string userName)
        {
            this.Payload = requestBody;
            this.Username = userName;
        }


        public OrderResponse HandleRequest()
        {
            //Remember to deserialize without goint to DB
            //Deseriliaze request paylod here:
            DataRepo dataRepo = new DataRepo();
            DeserializedRequest deserializedRequest = dataRepo.DeserializedRequest(this.Payload, this.Username);
            var fee = dataRepo.GetFees(this.Payload, this.Username);



            //Create Order Request and send to Quipu for URL generation
            QuipuRepo quipuRepo = new QuipuRepo();
            ReqOrder reqOrder = new ReqOrder { Amount = deserializedRequest.Amount, Currency = deserializedRequest.Currency.ToString(), Description = deserializedRequest.Description, Language = deserializedRequest.Language, Fee = fee.fee, VAT = fee.VAT };

            ApplicationRepository appRepo = new ApplicationRepository();
            int savedProcessId = appRepo.SaveProcess(deserializedRequest.ProcessCode, this.Username, JsonConvert.SerializeObject(new { DeserializedRequest = deserializedRequest, QuipuOrder = reqOrder, Payload = JsonConvert.DeserializeObject(this.Payload) }));

            var quipuOrder = quipuRepo.CreateOrderRequest(reqOrder, this.Username);
            appRepo.SaveProcessReason(savedProcessId, 1, this.Username, quipuOrder.Order.OrderID);
            return quipuOrder;
        }

        public OrderResponse GetPaymentPage(PaymentPageRequest paymentPageRequest)
        {
            ApplicationRepository appRepo = new ApplicationRepository();
            DataRepo dataRepo = new DataRepo();
            QuipuRepo quipuRepo = new QuipuRepo();
            var merchantUserName = appRepo.GetMerchantUserNameFromProcessId(paymentPageRequest.processId);
            var userDetails = appRepo.GetUserDetails(merchantUserName);
            var currency = appRepo.GetCurrencyCodes().FirstOrDefault(x => x.Code.ToLower() == paymentPageRequest.currency.ToLower()).NumericCode;
            DeserializedRequest deserializedRequest = new DeserializedRequest
            {
                Amount = paymentPageRequest.amount,
                Currency = currency,
                ProcessId = appRepo.GetProcessCode(paymentPageRequest.processId),
                Name = paymentPageRequest.customerFullName,
                PhoneNumber = paymentPageRequest.customerPhoneNumber,
                EmailAddress = paymentPageRequest.customerEmailAddress,
                Reference = paymentPageRequest.transactionReference,
                RedirectURL = paymentPageRequest.redirectURL,
                UserId = userDetails.UserId,
                Date = DateTime.Now.ToString(),
                Description = paymentPageRequest.pageTitle,
                ProcessCode = appRepo.GetProcessCode(paymentPageRequest.processId),
                Language= "EN",
                UserName = merchantUserName,
                ProductId = appRepo.MerchantProductIdByProcessId(userDetails.UserId,paymentPageRequest.processId)
            };
            ReqOrder reqOrder = new ReqOrder
            {
                Amount = paymentPageRequest.amount,
                Currency =  currency.ToString()
            , Language = "EN",
                Description = paymentPageRequest.pageTitle
            };
            var quipuOrder = quipuRepo.CreateOrderRequest(reqOrder, merchantUserName);
            int savedProcessId = appRepo.SaveProcess(deserializedRequest.ProcessId, merchantUserName, JsonConvert.SerializeObject(new
            {
                DeserializedRequest = deserializedRequest,
                QuipuOrder = reqOrder,
                Payload = JsonConvert.SerializeObject(paymentPageRequest)
            }));
            appRepo.SaveProcessReason(savedProcessId, 1, merchantUserName, quipuOrder.Order.OrderID);
            return quipuOrder;
        }

        private List<string> UniqueKeys(string jsonString)
        {
            List<string> uniqueHeaders = new List<string>();
            JArray parsedArray = JArray.Parse(jsonString);
            foreach (JObject parsedObject in parsedArray.Children<JObject>())
            {
                foreach (JProperty parsedProperty in parsedObject.Properties())
                {
                    string propertyName = parsedProperty.Name;
                    uniqueHeaders.Add(propertyName);
                }
            }
            return uniqueHeaders;
        }
    }

    // [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class DeserializedRequest
    {
        public string ProcessCode { get; set; }
        public string UserName { get; set; }
        public int UserId { get; set; }
        public decimal Amount { get; set; }
        public string BeneficiaryPhoneNumber { get; set; }
        public string StudentId { get; set; }
        public string StudentName { get; set; }
        public string SmartCardNumber { get; set; }
        public int Currency { get; set; }
        public string Description { get; set; }
        public string Language { get; set; }
        public string CustomerNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string ContractNumber { get; set; }
        public string SubscriberNumber { get; set; }
        public string TokenId { get; set; }
        public string SelectedOffer { get; set; }
        public string SelectedOption { get; set; }
        public string Duration { get; set; }
        public string FeeType { get; set; }
        public string Name { get; set; }
        public string CheckInDate { get; set; }
        public string CheckOutDate { get; set; }
        public string OrderNumber { get; set; }
        public string PassportNumber { get; set; }
        public string TravelFrom { get; set; }
        public string TravelTo { get; set; }
        public string Date { get; set; }
        public string ProcessId { get; set; }
        public string ProductCategoryId { get; set; }
        public string ProductId { get; set; }
        public string EmailAddress { get; internal set; }
        public string Reference { get; internal set; }
        public string RedirectURL { get; internal set; }
    }

    public class PaymentPageRequest
    {
        [Required]
        public string pageTitle;

        [Required]
        public string processId { get; set; }
        [Required]
        public string pageLogo { get; set; }
        [Required]
        public string pageDescription { get; set; }
        [Required]
        public string customerFullName { get; set; }
        [Required]
        public string customerPhoneNumber { get; set; }
        [EmailAddress]
        public string customerEmailAddress { get; set; }
        [Required]
        public string transactionReference { get; set; }
        [Required]
        public decimal amount { get; set; }
        [Required]
        public string currency { get; set; }
        [Required]
        public string redirectURL { get; set; }
    }
}
