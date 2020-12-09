using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace PCES.PaymentPlatform.Quipu.DTO.Response
{
    [XmlRoot(ElementName = "TKKPG")]
    public class RespQuipu<T>
    {
        [XmlElement(ElementName = "Response")]
        public T Response { get; set; }
    }

    public class OrderResponse
    {
        [XmlElement(ElementName = "Operation")]
        public string Operation { get; set; }
        [XmlElement(ElementName = "Status")]
        public string Status { get; set; }
        [XmlElement(ElementName = "Order")]
        public RpOrder Order { get; set; }
    }

    public class RpOrder
    {
        [XmlElement(ElementName = "OrderID")]
        public string OrderID { get; set; }
        [XmlElement(ElementName = "SessionID")]
        public string SessionID { get; set; }
        [XmlElement(ElementName = "URL")]
        public string URL { get; set; }
        public string OrderURL 
        {
            get
            {
                if (URL != null)
                {
                    return string.Format("{0}?ORDERID={1}&SESSIONID={2}", URL, OrderID, SessionID);
                }

                return null;
            }
          }
    }

    public class OrderStatusResponse
    {
        [XmlElement(ElementName = "Operation")]
        public string Operation { get; set; }
        [XmlElement(ElementName = "Status")]
        public string Status { get; set; }
        [XmlElement(ElementName = "Order")]
        public RpOrderStatus Order { get; set; }
        [XmlElement(ElementName = "AdditionalInfo")]
        public AdditionalInfo AdditionalInfo { get; set; }

    }

    public class RpOrderStatus
    {
        [XmlElement(ElementName = "OrderStatus")]
        public string OrderStatus { get; set; }
        [XmlElement(ElementName = "OrderID")]
        public string OrderID { get; set; }
    }

    public class AdditionalInfo
    {
        [XmlElement(ElementName = "Receipt")]
        public string Receipt { get; set; }
    }
}
