using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using PCES.PaymentPlatform.Quipu.DTO;
using PCES.PaymentPlatform.Quipu.DTO.Request;
using PCES.PaymentPlatform.Quipu.DTO.Response;
using PCES.PaymentPlatform.Repository.Application;
using PCES.PaymentPlatform.Utility;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;

namespace PCES.PaymentPlatform.Quipu
{
    public class QuipuClient
    {
        public QuipuClient()
        {
            ServicePointManager.ServerCertificateValidationCallback +=
   (sender, cert, chain, sslPolicyErrors) => true;
            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls
                   | SecurityProtocolType.Tls11
                   | SecurityProtocolType.Tls12;
        }

        private Helpers helpers = new Helpers();

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

        public OrderResponse CreateOrderRequest(decimal amount, string description, string operation, string orderType, string currencyCode, string language, string transactionId, string userId,decimal totalFees)
        {
            var orderRequest = new ReqQuipu<OrderRequest>()
            {
                Request = new OrderRequest()
                {
                    Language = language,
                    Operation = operation,
                    Order = new RqOrder
                    {
                        Amount = Math.Round(decimal.Multiply(amount +totalFees, 100),0),
                        OrderType = orderType,
                        Merchant = ConfigSettings.MerchantID,
                        Currency = currencyCode,
                        Fee = $"{Math.Round(decimal.Multiply(totalFees,100),0)}",
                        Description = description,
                        ApproveUrl = ConfigSettings.ApproveURL,
                        CancelUrl = ConfigSettings.CancelURL,
                        DeclineUrl = ConfigSettings.DeclineURL
                    }
                }
            };

            string xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";

            ApplicationRepository db = new ApplicationRepository();

            try
            {
                strRequest = string.Format("{0}{1}", xml, helpers.SerializeToString<ReqQuipu<OrderRequest>>(orderRequest));

                StringContent payload = new StringContent(strRequest, Encoding.UTF8, "application/xml");

                Logger.Info(string.Format("Quipu Order request: {0}", strRequest));

                HttpClient client = new HttpClient();
                using (HttpResponseMessage response = client.PostAsync(ConfigSettings.RequestEndpoint, payload).Result)

                using (HttpContent content = response.Content)

                using (StringReader sr = new StringReader(System.Text.Encoding.UTF8.GetString(content.ReadAsByteArrayAsync().Result)))
                {

                    strResponse = sr.ReadToEnd();
                    Logger.Info(string.Format("Quipu Order response: {0}", strResponse));

                    var quipuResponse = helpers.Deserialize<RespQuipu<OrderResponse>>(strResponse);

                    if (quipuResponse != null || !string.IsNullOrEmpty(quipuResponse.Response.Order.OrderID))
                    {
                        db.SavePaymentLog(strRequest, strResponse, true, transactionId, null, userId);
                    }
                    else
                    {
                        db.SavePaymentLog(strRequest, strResponse, false, transactionId, null, userId);
                    }

                    return quipuResponse.Response;
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                db.SavePaymentLog(strRequest, strResponse, false, transactionId, ex.Message, userId);
                throw ex;
            }
        }

        public OrderStatusResponse CheckOrderStatus(string orderID, string sessionID, string operation, string language, string transactionId, string userId)
        {

            var orderRequest = new ReqQuipu<OrderStatusRequest>()
            {
                Request = new OrderStatusRequest()
                {
                    Language = language,
                    Operation = operation,
                    Order = new RqOrderStatus()
                    {
                        Merchant = ConfigSettings.MerchantID,
                        OrderID = orderID
                    },
                    SessionID = sessionID
                }
            };

            string xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";

            ApplicationRepository db = new ApplicationRepository();

            try
            {

                var request = string.Format("{0}{1}", xml, helpers.SerializeToString<ReqQuipu<OrderStatusRequest>>(orderRequest));

                StringContent payload = new StringContent(request, Encoding.UTF8, "text/xml");

                Logger.Info(string.Format("Quipu Order Status request: {0}", request));


                HttpClient client = new HttpClient();
                using (HttpResponseMessage response = client.PostAsync(ConfigSettings.RequestEndpoint, payload).Result)

                using (HttpContent content = response.Content)

                using (StringReader sr = new StringReader(content.ReadAsStringAsync().Result))
                {
                    strRequest = sr.ReadToEnd();
                    Logger.Info(string.Format("Quipu Order Status response: {0}", strRequest));
                    var quipuResponse = helpers.Deserialize<RespQuipu<OrderStatusResponse>>(strRequest);

                    if (quipuResponse != null || !string.IsNullOrEmpty(quipuResponse.Response.Order.OrderID))
                    {
                        db.SavePaymentLog(strRequest, strResponse, true, transactionId, null, userId);
                    }
                    else
                    {
                        db.SavePaymentLog(strRequest, strResponse, false, transactionId, null, userId);
                    }

                    return quipuResponse.Response;
                }

            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                db.SavePaymentLog(strRequest, strResponse, false, transactionId, ex.Message, userId);
                throw ex;
            }
        }
    }
}
