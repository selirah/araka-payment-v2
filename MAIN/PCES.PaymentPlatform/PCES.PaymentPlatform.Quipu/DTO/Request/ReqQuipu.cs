using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace PCES.PaymentPlatform.Quipu.DTO.Request
{
    [XmlRoot(ElementName = "TKKPG")]
    public class ReqQuipu<T>
    {
        [XmlElement(ElementName = "Request")]
        public T Request { get; set; }
    }


    public class OrderRequest
    {
        [XmlElement(ElementName = "Operation")]
        public string Operation { get; set; }
        [XmlElement(ElementName = "Language")]
        public string Language { get; set; }
        [XmlElement(ElementName = "Order")]
        public RqOrder Order { get; set; }
    }

    public class RqOrder
    {
        [XmlElement(ElementName = "Merchant")]
        public string Merchant { get; set; }
        [XmlElement(ElementName = "Amount")]
        public decimal Amount { get; set; }
        [XmlElement(ElementName = "Currency")]
        public string Currency { get; set; }
        [XmlElement(ElementName = "Description")]
        public string Description { get; set; }
        [XmlElement(ElementName = "ApproveURL")]
        public string ApproveUrl { get; set; }
        [XmlElement(ElementName = "CancelURL")]
        public string CancelUrl { get; set; }
        [XmlElement(ElementName = "DeclineURL")]
        public string DeclineUrl { get; set; }
        [XmlIgnore]
        [XmlElement(ElementName = "OrderType")]
        public string OrderType { get; set; }
        [XmlElement(ElementName = "Fee")]
        public string Fee { get; set; }
    }

    public class OrderStatusRequest
    {
        [XmlElement(ElementName = "Operation")]
        public string Operation { get; set; }
        [XmlElement(ElementName = "Language")]
        public string Language { get; set; }
        [XmlElement(ElementName = "Order")]
        public RqOrderStatus Order { get; set; }
        [XmlElement(ElementName = "SessionID")]
        public string SessionID { get; set; }

    }

    public class RqOrderStatus
    {
        [XmlElement(ElementName = "Merchant")]
        public string Merchant { get; set; }
        [XmlElement(ElementName = "OrderID")]
        public string OrderID { get; set; }
    }
}
