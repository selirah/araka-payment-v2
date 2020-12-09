﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PCES.PaymentPlatform.WebAPI.DTO.PaymentHubProxy
{
    public class ReqCanalVerifyRenewal
    {
        [Required]
        public string SelectedOffer { get; set; }
        [Required]
        public string SelectedOption { get; set; }
        [Required]
        public string Duration { get; set; }
        [Required]
        public string ContractNumber { get; set; }
        [Required]
        public string SubscriberNumber { get; set; }
        [Required]
        public string TokenId { get; set; }
    }
}
