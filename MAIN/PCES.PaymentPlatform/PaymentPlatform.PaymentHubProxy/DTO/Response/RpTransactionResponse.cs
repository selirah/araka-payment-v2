﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentPlatform.PaymentHubProxy.DTO.Response
{
   public class RpTransactionResponse
    {
        public string OriginatingTransactionID { get; set; }
        public string TransactionID { get; set; }
        public string Status { get; set; }
    }
}
