using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PCES.PaymentPlatform.WebAPI.DTO.PaymentHubProxy
{
    public class ReqCanalAccountOffers
    {
        [Required]
        public string SmartCardNumber { get; set; }
    }
}                                          