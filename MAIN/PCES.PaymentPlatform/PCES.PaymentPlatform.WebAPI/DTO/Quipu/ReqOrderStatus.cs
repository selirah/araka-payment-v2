using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PCES.PaymentPlatform.WebAPI.DTO.Quipu
{
    public class ReqOrderStatus
    {
        [Required]
        public string OrderId { get; set; }
        [Required]
        public string SessionId { get; set; }
        [Required]
        public string Language { get; set; }
    }
}
