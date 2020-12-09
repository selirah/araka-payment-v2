using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PCES.PaymentPlatform.WebAPI.DTO.PaymentHubProxy
{
    public class ReqAirtelAirtimeTopup
    {
        [Required]
        public string Currency { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public string BeneficiaryPhoneNumber { get; set; }

    }
}
