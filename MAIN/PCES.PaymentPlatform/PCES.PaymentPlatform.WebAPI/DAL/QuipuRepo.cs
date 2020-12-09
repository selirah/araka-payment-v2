using PCES.PaymentPlatform.Quipu;
using PCES.PaymentPlatform.Quipu.DTO.Response;
using PCES.PaymentPlatform.Utility;
using PCES.PaymentPlatform.WebAPI.DTO;
using PCES.PaymentPlatform.WebAPI.DTO.Quipu;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Threading.Tasks;

namespace PCES.PaymentPlatform.WebAPI.DAL
{
    public class QuipuRepo
    {
        private QuipuClient quipuClient;

        public QuipuClient QuipuClient
        {
            get
            {
                if (quipuClient == null)
                    quipuClient = new QuipuClient();
                return quipuClient;
            }
        }


        public OrderResponse CreateOrderRequest(ReqOrder order, string userId)
        {
            try
            {
                // get transactionID from Process

               // string transactonID = "";

                var response = QuipuClient.CreateOrderRequest(order.Amount,order.Description, OperationTypes.CreateOrder.ToString(), OrderTypes.Purchase.ToString(), order.Currency, order.Language, null, userId,(order.Fee+order.VAT));


                return response;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }


        public OrderStatusResponse CheckOrderStatus(ReqOrderStatus orderStatus, string userId)
        {
            try
            {
                // get transactionID from Process


                var response = QuipuClient.CheckOrderStatus(orderStatus.OrderId, orderStatus.SessionId, OperationTypes.GetOrderStatus.ToString(), orderStatus.Language, null, userId);

                if (response == null)
                {

                }
                else
                {
                    switch (response.Order.OrderStatus)
                    {
                        case "APPROVED":
                            break;
                        case "CANCELED":
                                break;
                        case "DECLINED":
                            break;
                        case "REVERSED":
                            break;
                        case "REFUNDED":
                            break;
                        case "ERROR":
                            break;
                        case "ON-PAYMENT": // used to avoid purchase or repayment
                            break;
                        default:
                            break;
                    }
                }

                return response;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public void OrderPruchaseStatus(PurchaseResponse purchase, string userId)
        {
            try
            {
                // process purchase

                switch (purchase.OrderStatus.ToLower())
                {
                    case "approved":
                        break;
                    case "declined":
                        break;
                    default:
                        break;
                }

            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }
    }
}
