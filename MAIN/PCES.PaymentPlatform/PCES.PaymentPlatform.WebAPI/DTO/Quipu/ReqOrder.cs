using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace PCES.PaymentPlatform.WebAPI.DTO.Quipu
{
    public class ReqOrder
    {
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Currency { get; set; }
        [Required]
        public string Language { get; set; }
        public decimal Fee { get; set; }
        public decimal VAT { get; set; }
    }

    [XmlRoot(ElementName = "TKKPG")]
    public class RespQuipu<T>
    {
        [XmlElement(ElementName = "Response")]
        public T Response { get; set; }
    }


    // NOTE: Generated code may require at least .NET Framework 4.5 or .NET Core/Standard 2.0.
    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "", IsNullable = false, ElementName = "Message")]
    public partial class PurchaseResponse
    {

        private string languageField;

        private string responseCodeField;

        private decimal versionField;

        private string currencyField;

        private string sessionIdField;

        private string approvalCodeField;

        private uint rRNField;

        private decimal feeScrField;

        private string orderIDField;

        private string sessionIDField;

        private string orderStatusField;

        private string cardHolderNameField;

        private string purchaseAmountField;

        private string brandField;

        private string totalAmountField;

        private string acqFeeField;

        private string pANField;

        private MessageThreeDSVars threeDSVarsField;

        private string transactionTypeField;

        private decimal acqFeeScrField;

        private string currencyScrField;

        private decimal purchaseAmountScrField;

        private uint approvalCodeScrField;

        private decimal totalAmountScrField;

        private string orderDescriptionField;

        private string rezultOperationField;

        private string merchantTranIDField;

        private string responseDescriptionField;

        private string currencyISOAlphaField;

        private string orderStatusScrField;

        private string tranDateTimeField;

        private string response_gField;

        private string dateField;

        /// <remarks/>
        public string Language
        {
            get
            {
                return this.languageField;
            }
            set
            {
                this.languageField = value;
            }
        }

        /// <remarks/>
        public string ResponseCode
        {
            get
            {
                return this.responseCodeField;
            }
            set
            {
                this.responseCodeField = value;
            }
        }

        /// <remarks/>
        public decimal Version
        {
            get
            {
                return this.versionField;
            }
            set
            {
                this.versionField = value;
            }
        }

        /// <remarks/>
        public string Currency
        {
            get
            {
                return this.currencyField;
            }
            set
            {
                this.currencyField = value;
            }
        }

        /// <remarks/>
        public string SessionId
        {
            get
            {
                return this.sessionIdField;
            }
            set
            {
                this.sessionIdField = value;
            }
        }

        /// <remarks/>
        public string ApprovalCode
        {
            get
            {
                return this.approvalCodeField;
            }
            set
            {
                this.approvalCodeField = value;
            }
        }

        /// <remarks/>
        public uint RRN
        {
            get
            {
                return this.rRNField;
            }
            set
            {
                this.rRNField = value;
            }
        }

        /// <remarks/>
        public decimal FeeScr
        {
            get
            {
                return this.feeScrField;
            }
            set
            {
                this.feeScrField = value;
            }
        }

        /// <remarks/>
        public string OrderID
        {
            get
            {
                return this.orderIDField;
            }
            set
            {
                this.orderIDField = value;
            }
        }

        /// <remarks/>
        public string SessionID
        {
            get
            {
                return this.sessionIDField;
            }
            set
            {
                this.sessionIDField = value;
            }
        }

        /// <remarks/>
        public string OrderStatus
        {
            get
            {
                return this.orderStatusField;
            }
            set
            {
                this.orderStatusField = value;
            }
        }

        /// <remarks/>
        public string CardHolderName
        {
            get
            {
                return this.cardHolderNameField;
            }
            set
            {
                this.cardHolderNameField = value;
            }
        }

        /// <remarks/>
        public string PurchaseAmount
        {
            get
            {
                return this.purchaseAmountField;
            }
            set
            {
                this.purchaseAmountField = value;
            }
        }

        /// <remarks/>
        public string Brand
        {
            get
            {
                return this.brandField;
            }
            set
            {
                this.brandField = value;
            }
        }

        /// <remarks/>
        public string TotalAmount
        {
            get
            {
                return this.totalAmountField;
            }
            set
            {
                this.totalAmountField = value;
            }
        }

        /// <remarks/>
        public string AcqFee
        {
            get
            {
                return this.acqFeeField;
            }
            set
            {
                this.acqFeeField = value;
            }
        }

        /// <remarks/>
        public string PAN
        {
            get
            {
                return this.pANField;
            }
            set
            {
                this.pANField = value;
            }
        }

        /// <remarks/>
        public MessageThreeDSVars ThreeDSVars
        {
            get
            {
                return this.threeDSVarsField;
            }
            set
            {
                this.threeDSVarsField = value;
            }
        }

        /// <remarks/>
        public string TransactionType
        {
            get
            {
                return this.transactionTypeField;
            }
            set
            {
                this.transactionTypeField = value;
            }
        }

        /// <remarks/>
        public decimal AcqFeeScr
        {
            get
            {
                return this.acqFeeScrField;
            }
            set
            {
                this.acqFeeScrField = value;
            }
        }

        /// <remarks/>
        public string CurrencyScr
        {
            get
            {
                return this.currencyScrField;
            }
            set
            {
                this.currencyScrField = value;
            }
        }

        /// <remarks/>
        public decimal PurchaseAmountScr
        {
            get
            {
                return this.purchaseAmountScrField;
            }
            set
            {
                this.purchaseAmountScrField = value;
            }
        }

        /// <remarks/>
        public uint ApprovalCodeScr
        {
            get
            {
                return this.approvalCodeScrField;
            }
            set
            {
                this.approvalCodeScrField = value;
            }
        }

        /// <remarks/>
        public decimal TotalAmountScr
        {
            get
            {
                return this.totalAmountScrField;
            }
            set
            {
                this.totalAmountScrField = value;
            }
        }

        /// <remarks/>
        public string OrderDescription
        {
            get
            {
                return this.orderDescriptionField;
            }
            set
            {
                this.orderDescriptionField = value;
            }
        }

        /// <remarks/>
        public string RezultOperation
        {
            get
            {
                return this.rezultOperationField;
            }
            set
            {
                this.rezultOperationField = value;
            }
        }

        /// <remarks/>
        public string MerchantTranID
        {
            get
            {
                return this.merchantTranIDField;
            }
            set
            {
                this.merchantTranIDField = value;
            }
        }

        /// <remarks/>
        public string ResponseDescription
        {
            get
            {
                return this.responseDescriptionField;
            }
            set
            {
                this.responseDescriptionField = value;
            }
        }

        /// <remarks/>
        public string CurrencyISOAlpha
        {
            get
            {
                return this.currencyISOAlphaField;
            }
            set
            {
                this.currencyISOAlphaField = value;
            }
        }

        /// <remarks/>
        public string OrderStatusScr
        {
            get
            {
                return this.orderStatusScrField;
            }
            set
            {
                this.orderStatusScrField = value;
            }
        }

        /// <remarks/>
        public string TranDateTime
        {
            get
            {
                return this.tranDateTimeField;
            }
            set
            {
                this.tranDateTimeField = value;
            }
        }

        /// <remarks/>
        public string Response_g
        {
            get
            {
                return this.response_gField;
            }
            set
            {
                this.response_gField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string date
        {
            get
            {
                return this.dateField;
            }
            set
            {
                this.dateField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public partial class MessageThreeDSVars
    {

        private MessageThreeDSVarsAnswerVars answerVarsField;

        private MessageThreeDSVarsPrefixParam prefixParamField;

        /// <remarks/>
        public MessageThreeDSVarsAnswerVars AnswerVars
        {
            get
            {
                return this.answerVarsField;
            }
            set
            {
                this.answerVarsField = value;
            }
        }

        /// <remarks/>
        public MessageThreeDSVarsPrefixParam PrefixParam
        {
            get
            {
                return this.prefixParamField;
            }
            set
            {
                this.prefixParamField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public partial class MessageThreeDSVarsAnswerVars
    {

        private string enrolledField;

        private string enrolledField1;

        private string xidField;

        /// <remarks/>
        public string enrolled
        {
            get
            {
                return this.enrolledField;
            }
            set
            {
                this.enrolledField = value;
            }
        }

        /// <remarks/>
        public string Enrolled
        {
            get
            {
                return this.enrolledField1;
            }
            set
            {
                this.enrolledField1 = value;
            }
        }

        /// <remarks/>
        public string xid
        {
            get
            {
                return this.xidField;
            }
            set
            {
                this.xidField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public partial class MessageThreeDSVarsPrefixParam
    {

        private string typeCardField;

        private string pOSConditionIfPAResUField;

        private string pOSConditionIfNotEnrolledField;

        private bool purchaseIfNotEnrolledField;

        /// <remarks/>
        public string TypeCard
        {
            get
            {
                return this.typeCardField;
            }
            set
            {
                this.typeCardField = value;
            }
        }

        /// <remarks/>
        public string POSConditionIfPAResU
        {
            get
            {
                return this.pOSConditionIfPAResUField;
            }
            set
            {
                this.pOSConditionIfPAResUField = value;
            }
        }

        /// <remarks/>
        public string POSConditionIfNotEnrolled
        {
            get
            {
                return this.pOSConditionIfNotEnrolledField;
            }
            set
            {
                this.pOSConditionIfNotEnrolledField = value;
            }
        }

        /// <remarks/>
        public bool PurchaseIfNotEnrolled
        {
            get
            {
                return this.purchaseIfNotEnrolledField;
            }
            set
            {
                this.purchaseIfNotEnrolledField = value;
            }
        }
    }



}
