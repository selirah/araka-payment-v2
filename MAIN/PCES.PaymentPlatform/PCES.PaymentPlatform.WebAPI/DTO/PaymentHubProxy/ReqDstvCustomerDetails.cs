using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PCES.PaymentPlatform.WebAPI.DTO.PaymentHubProxy
{
    public class ReqDstvCustomerDetails
    {
        [Required]
        public string SmartCardNumber { get; set; }
    }

    public class ReqDstvGetProducts
    {
        [Required]
        public string CustomerNumber { get; set; }
    }

    public class ReqDstvPayment
    {
        [Required]
        public string CustomerNumber { get; set; }
        [Required]
        public string SmartCardNumber { get; set; }
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public string Currency { get; set; }
    }

    public class ReqDstvDueDate
    {
        [Required]
        public string SmartCardNumber { get; set; }
    }
}
