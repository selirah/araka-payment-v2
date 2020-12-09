﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace PaymentPlatform.PaymentHubProxy.DTO.Request
{
   public class RqSendMobileMoneyBankToWallet
    {
        public string BeneficiaryPhoneNumber { get; set; }
        public decimal Amount { get; set; }
        public string TransactionID { get; set; }
        public string Currency { get; set; }
        public string AccountNumber { get; set; }
        public string PIN { get; set; }
    }
}
