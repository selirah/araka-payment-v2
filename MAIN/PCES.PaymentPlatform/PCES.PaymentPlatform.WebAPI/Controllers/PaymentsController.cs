using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PCES.PaymentPlatform.DomainClasses.Banking;
using PCES.PaymentPlatform.Repository.Application;
using PCES.PaymentPlatform.Utility;
using PCES.PaymentPlatform.WebAPI.DAL;
using PCES.PaymentPlatform.WebAPI.DTO;
using PCES.PaymentPlatform.WebAPI.DTO.PaymentHubProxy;
using PCES.PaymentPlatform.WebAPI.DTO.Quipu;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PCES.PaymentPlatform.WebAPI.Controllers
{


    //[EnableCors("AllowSpecificOrigin")]
    [ApiExplorerSettings(IgnoreApi = true)]
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private static ConfigSettings _configSettings;
        public static ConfigSettings ConfigSettings
        {
            get
            {
                if (_configSettings == null)
                    _configSettings = new ConfigSettings();
                return _configSettings;
            }
        }

        private IConfiguration _config;

        public PaymentsController(IConfiguration config)
        {
            _config = config;
        }

        // GET: api/<PaymentsController>
        [HttpGet("productcategories")]
        public IActionResult GetProductCategories()
        {
            try
            {
                DataRepo dataRepo = new DataRepo();
                var response = dataRepo.GetProductCategories();
                return Ok(response);
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("merchantproducts/{categoryId}/{merchantId}")]
        public IActionResult GetMerchantProducts(int categoryId, int merchantId)
        {
            try
            {
                DataRepo dataRepo = new DataRepo();
                var response = dataRepo.GetMerchantProducts(categoryId, merchantId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("currencycodes")]
        public IActionResult GetCurrencyCodes()
        {
            try
            {
                DataRepo dataRepo = new DataRepo();
                var response = dataRepo.GetCurrencyCodes();
                return Ok(response);
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("languages")]
        public IActionResult GetCultures()
        {
            try
            {
                DataRepo dataRepo = new DataRepo();
                var response = dataRepo.GetCultures();
                return Ok(response);
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        // POST api/<PaymentsController>
        [HttpPost("order")]
        public IActionResult PostOrder(ReqOrder rqOrder)
        {
            try
            {
                if (rqOrder != null && ModelState.IsValid)
                {

                    QuipuRepo quipuRepo = new QuipuRepo();

                    var response = quipuRepo.CreateOrderRequest(rqOrder, "paymentplatform");
                    return Ok(response);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("orderstatus")]
        public IActionResult CheckOrderStatus(ReqOrderStatus reqOrderStatus)
        {
            try
            {
                if (reqOrderStatus != null && ModelState.IsValid)
                {
                    QuipuRepo quipuRepo = new QuipuRepo();

                    var response = quipuRepo.CheckOrderStatus(reqOrderStatus, "paymentplatform");

                    return Ok();
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("getpaymentpage")]
        public async Task<IActionResult> GetPaymentPage(PaymentPageRequest paymentPageRequest)
        {
            try
            {
                PCESRequestHandler handler = new PCESRequestHandler();
                return Ok(handler.GetPaymentPage(paymentPageRequest));
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("processrequest")]
        [Authorize]
        public async Task<IActionResult> processFormSubmitRequest()//([FromBody]JObject jrequest)
        {
            try
            {
                //DeserializedRequest deserializedRequest = jrequest["data"]?.ToObject<DeserializedRequest>();
                using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
                {
                    var response = await reader.ReadToEndAsync();

                    Logger.Info(string.Format("PROCESS REQUEST: {0}", response));

                    PCESRequestHandler handler = new PCESRequestHandler(response, User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                    return Ok(handler.HandleRequest());
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        private string ConvertFromBase64(string stringToConvert)
        {
            return Encoding.UTF8.GetString(Convert.FromBase64String(HttpUtility.UrlDecode(stringToConvert).Replace("xmlmsg=", "")));
        }

        [HttpPost("orderapproved")]
        public async Task<IActionResult> OrderApproved()
        {
            try
            {
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    var response = await reader.ReadToEndAsync();

                    response = ConvertFromBase64(response);

                    Logger.Info(string.Format("ORDER APPROVED: {0}", response));

                    DataRepo dataRepo = new DataRepo(_config);

                    dataRepo.SavePaymentLog("", response, true, null, "Order Approved Response", "quipu");

                    dataRepo.AddMoneyToAccount(response);
                    dataRepo.PurchaseItem(response);

                    dataRepo.SendPaymentApprovedEmail(response);


                    var redirectDetails = dataRepo.GetRedirectDetails(response);
                    if (redirectDetails != null && !string.IsNullOrWhiteSpace(redirectDetails.RedirectURL))
                    {
                        if (redirectDetails.RedirectURL.ToLower().StartsWith("file"))
                        {
                            return Redirect($"{redirectDetails.RedirectURL}?systemReference={redirectDetails.ProcessId}&transactionStatus=SUCCESS");
                        }
                        var param = new Dictionary<string, string>() { { "systemReference", redirectDetails.ProcessId.ToString() },{ "transactionStatus", "SUCCESS" } };
                        var newUrl = new Uri(QueryHelpers.AddQueryString(redirectDetails.RedirectURL, param));
                        return Redirect(newUrl.ToString());
                    }

                    if (string.IsNullOrEmpty(ConfigSettings.ApprovedPage))
                        return Ok("Order Approved");
                    return Redirect(ConfigSettings.ApprovedPage);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("getfees")]
        public async Task<IActionResult> GetFees()
        {
            try
            {
                using (StreamReader reader = new StreamReader(Request.Body))
                {
                    var response = await reader.ReadToEndAsync();
                    DataRepo dataRepo = new DataRepo(_config);
                    return Ok(dataRepo.GetFees(response, User.FindFirst(ClaimTypes.NameIdentifier)?.Value));
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("clientdetails/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetClientDetails(int userId)
        {
            try
            {
                DataRepo dataRepo = new DataRepo(_config);
                return Ok(dataRepo.GetClientDetails(userId));
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost("clientdetails")]
        [Authorize]
        public async Task<IActionResult> UpdateClientDetails(ClientRqDTO client)
        {
            try
            {
                if (client == null || client.UserId < 1 || string.IsNullOrEmpty(client.PhoneNumber))
                {
                    return BadRequest();
                }

                DataRepo dataRepo = new DataRepo(_config);
                return Ok(dataRepo.UpdateClientDetails(client));
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("beneficiaries/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetBeneficiaries(int userId)
        {
            try
            {
                DataRepo dataRepo = new DataRepo(_config);
                return Ok(dataRepo.GetBeneficiaries(userId));
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("addbeneficiary")]
        [Authorize]
        public async Task<IActionResult> AddBeneficiary(Beneficiary beneficiary)
        {
            try
            {
                if (beneficiary == null || beneficiary.UserId < 1)
                {
                    return BadRequest();
                }

                DataRepo dataRepo = new DataRepo(_config);
                return Ok(dataRepo.AddBeneficiary(beneficiary));
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost("updatebeneficiary")]
        [Authorize]
        public async Task<IActionResult> UpdateBeneficiary(Beneficiary beneficiary)
        {
            try
            {
                if (beneficiary == null || beneficiary.UserId < 1 || beneficiary.BeneficiaryId < 1)
                {
                    return BadRequest();
                }

                DataRepo dataRepo = new DataRepo(_config);
                return Ok(dataRepo.UpdateBeneficiary(beneficiary));
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("deletebeneficiary")]
        [Authorize]
        public async Task<IActionResult> DeleteBeneficiary(Beneficiary beneficiary)
        {
            try
            {
                if (beneficiary == null || beneficiary.BeneficiaryId < 1)
                {
                    return BadRequest();
                }

                DataRepo dataRepo = new DataRepo(_config);
                return Ok(dataRepo.DeleteBeneficiary(beneficiary.BeneficiaryId));
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("orderdeclined")]
        public async Task<IActionResult> OrderDeclined()
        {
            try
            {
                using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
                {
                    var response = await reader.ReadToEndAsync();
                    response = ConvertFromBase64(response);
                    Logger.Info(string.Format("ORDER DECLINED: {0}", response));

                    DataRepo dataRepo = new DataRepo(_config);

                    dataRepo.SavePaymentLog("", response, true, null, "Order Declined Response", "quipu");

                    dataRepo.SendPaymentRejectedEmail(response);

                    var redirectDetails = dataRepo.GetRedirectDetails(response);
                    if (redirectDetails != null && !string.IsNullOrWhiteSpace(redirectDetails.RedirectURL))
                    {
                        if (redirectDetails.RedirectURL.ToLower().StartsWith("file"))
                        {
                            return Redirect($"{redirectDetails.RedirectURL}?systemReference={redirectDetails.ProcessId}&transactionStatus=FAILED");
                        }
                        var param = new Dictionary<string, string>() { { "systemReference", redirectDetails.ProcessId.ToString() }, { "transactionStatus", "FAILED" } };
                        var newUrl = new Uri(QueryHelpers.AddQueryString(redirectDetails.RedirectURL, param));
                        return Redirect(newUrl.ToString());
                    }

                    if (string.IsNullOrEmpty(ConfigSettings.DeclinedPage))
                        return Ok("Order Declined");
                    return Redirect(ConfigSettings.DeclinedPage);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpGet("transactionhistory")]
        public async Task<IActionResult> GetUserTransactionHistory()
        {
            try
            {
                DataRepo dataRepo = new DataRepo(_config);
                var res = dataRepo.GetTransactions(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                return Ok(res.Select(s => new {s.currency, s.transactionId, createdAt = s.transactionDate, s.amountPaid, s.transactionDescription, s.charge, s.VAT, s.status, transactionDetails = new { data = s.data != null ? JsonConvert.DeserializeObject(s.data) : null } }).ToList());
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpGet("gettransactionreciept/{transactionid}")]
        public async Task<IActionResult>GetTransactionReceipt(string transactionid)
        {
            try
            {
                DataRepo dataRepo = new DataRepo(_config);
                var res = await dataRepo.GetReceipt(transactionid);
                if (res!=null)
                {
                    string mimeType = "application/pdf";
                    return Ok(new FileContentResult(res, mimeType)
                    {
                        FileDownloadName = string.Format("{0}.pdf", transactionid.ToString())
                    });
                }
                return  StatusCode(500, "receipt creation failed");
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }


        [Authorize]
        [HttpGet("getmerchanttransactions")]
        public async Task<IActionResult> GetMerchantTransactions()
        {
            DataRepo dataRepo = new DataRepo(_config);
            var res = dataRepo.GetMerchantTransactions(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(res.Select(s => new {s.Channel, s.Customer, s.currency, s.transactionId, createdAt = s.transactionDate, s.amountPaid, s.transactionDescription, s.charge, s.VAT, s.status, transactionDetails = new { data = s.data != null ? JsonConvert.DeserializeObject(s.data) : null } }).ToList());
        }

        //[HttpGet("pdffiletest")]
        //public async Task<IActionResult> GetFile()
        //{
        //    string path = @"C:\Users\koby\Downloads\Scanned Documents.pdf";
        //    string mimeType = "application/pdf";
        //    var stream = await System.IO.File.ReadAllBytesAsync(path);
        //    return new FileContentResult(stream, mimeType)
        //    {
        //        FileDownloadName = "FileasStream.pdf"
        //    };
        //}

      

        [HttpPost("ordercanceled")]
        public async Task<IActionResult> OrderCancelled()
        {
            try
            {
                using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
                {
                    var response = await reader.ReadToEndAsync();
                    response = ConvertFromBase64(response);
                    Logger.Info(string.Format("ORDER CANCELED: {0}", response));

                    DataRepo dataRepo = new DataRepo(_config);

                    dataRepo.SavePaymentLog("", response, true, null, "Order Canceled Response", "quipu");

                    dataRepo.SendPaymentCancelledEmail(response);

                    var redirectDetails = dataRepo.GetRedirectDetails(response);
                    if (redirectDetails!=null && !string.IsNullOrWhiteSpace(redirectDetails.RedirectURL))
                    {
                        if (redirectDetails.RedirectURL.ToLower().StartsWith("file"))
                        {
                            return Redirect($"{redirectDetails.RedirectURL}?systemReference={redirectDetails.ProcessId}&transactionStatus=FAILED");
                        }
                        var param = new Dictionary<string, string>() { { "systemReference", redirectDetails.ProcessId.ToString() }, { "transactionStatus", "FAILED" } };
                        var newUrl = new Uri(QueryHelpers.AddQueryString(redirectDetails.RedirectURL, param));
                        return Redirect(newUrl.ToString());
                    }

                    if (string.IsNullOrEmpty(ConfigSettings.CanceledPage))
                        return Ok("Order Cancelled");
                    return Redirect(ConfigSettings.CanceledPage);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }



        #region PaymentHubProxy Requests

        [HttpPost("airtimetopup")]
        public IActionResult AirtimeTopup(ReqAirtelAirtimeTopup rqAirtelAirtimeTopup)
        {
            try
            {
                if (rqAirtelAirtimeTopup != null && ModelState.IsValid)
                {
                    PaymentHubProxyRepo paymentHubRepo = new PaymentHubProxyRepo();

                    var response = paymentHubRepo.PurchaseAirtimeNoTransaction(rqAirtelAirtimeTopup, "paymentplatform");
                    return Ok(response);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("mpesabanktowallet")]
        public IActionResult MpesaBankToWallet(ReqSendMobileMoneyBankToWallet rqBankToWallet)
        {
            try
            {
                if (rqBankToWallet != null && ModelState.IsValid)
                {
                    PaymentHubProxyRepo paymentHubRepo = new PaymentHubProxyRepo();

                    var response = paymentHubRepo.VodacomBankToWalletNoTransaction(rqBankToWallet, "paymentplatform");
                    return Ok(response);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        #region CANAL PLUS

        [HttpPost("canalplus/getaccountoffers")]
        public IActionResult CanalPlusCheckAccountOffer(ReqCanalAccountOffers reqCanalAccountOffers)
        {
            try
            {
                if (reqCanalAccountOffers != null && ModelState.IsValid)
                {
                    PaymentHubProxyRepo paymentHubRepo = new PaymentHubProxyRepo();

                    var response = paymentHubRepo.CanalPlusCheckAccountOffer(reqCanalAccountOffers, "paymentplatform");
                    return Ok(response);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("canalplus/getofferoptions")]
        public IActionResult CanalPlusGetOfferOptions(ReqCanalAccountOptions reqCanalAccountOptions)
        {
            try
            {
                if (reqCanalAccountOptions != null && ModelState.IsValid)
                {
                    PaymentHubProxyRepo paymentHubRepo = new PaymentHubProxyRepo();

                    var response = paymentHubRepo.CanalPlusGetOfferOptions(reqCanalAccountOptions, "paymentplatform");
                    return Ok(response);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost("canalplus/getoptionsdurations")]
        public IActionResult CanalPlusGetOptionDurations(ReqCanalAccountDurations reqCanalAccountDurations)
        {
            try
            {
                if (reqCanalAccountDurations != null && ModelState.IsValid)
                {
                    PaymentHubProxyRepo paymentHubRepo = new PaymentHubProxyRepo();

                    var response = paymentHubRepo.CanalPlusGetOptionDurations(reqCanalAccountDurations, "paymentplatform");
                    return Ok(response);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("canalplus/verifyoptions")]
        public IActionResult CanalPlusVerifyRenewalOffer(ReqCanalVerifyRenewal reqCanalVerify)
        {
            try
            {
                if (reqCanalVerify != null && ModelState.IsValid)
                {
                    PaymentHubProxyRepo paymentHubRepo = new PaymentHubProxyRepo();

                    var response = paymentHubRepo.CanalPlusVerifyRenewalOffer(reqCanalVerify, "paymentplatform");
                    return Ok(response);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost("canalplus/registerrenewal")]
        public IActionResult CanalPlusRegisterStandardRenewal(ReqCanalRegisterStandardRenewal registerStandardRenewal)
        {
            try
            {
                if (registerStandardRenewal != null && ModelState.IsValid)
                {
                    PaymentHubProxyRepo paymentHubRepo = new PaymentHubProxyRepo();

                    var response = paymentHubRepo.CanalPlusRegisterStandardRenewalNoTransaction(registerStandardRenewal, "paymentplatform");
                    return Ok(response);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        #endregion

        #region DSTV

        [HttpPost("dstv/getcustomerdetails")]
        public IActionResult DStvGetCustomerDetails(ReqDstvCustomerDetails reqDstvCustomer)
        {
            try
            {
                if (reqDstvCustomer != null && ModelState.IsValid)
                {
                    PaymentHubProxyRepo paymentHubRepo = new PaymentHubProxyRepo();

                    var response = paymentHubRepo.DStvGetCustomerDetails(reqDstvCustomer, "paymentplatform");
                    return Ok(response);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost("dstv/getavailableproducts")]
        public IActionResult DStvGetAvailableProducts(ReqDstvGetProducts dstvGetProducts)
        {
            try
            {
                if (dstvGetProducts != null && ModelState.IsValid)
                {
                    PaymentHubProxyRepo paymentHubRepo = new PaymentHubProxyRepo();

                    var response = paymentHubRepo.DStvGetAvailableProducts(dstvGetProducts, "paymentplatform");
                    return Ok(response);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("dstv/makepayment")]
        public IActionResult DStvProcessPayment(ReqDstvPayment reqDstvPayment)
        {
            try
            {
                if (reqDstvPayment != null && ModelState.IsValid)
                {
                    PaymentHubProxyRepo paymentHubRepo = new PaymentHubProxyRepo();

                    var response = paymentHubRepo.DStvProcessPaymentNoTransaction(reqDstvPayment, "paymentplatform");
                    return Ok(response);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("dstv/getdueamountanddate")]
        public IActionResult DStvGetDueAmountAndDate(ReqDstvDueDate dstvDueDate)
        {
            try
            {
                if (dstvDueDate != null && ModelState.IsValid)
                {
                    PaymentHubProxyRepo paymentHubRepo = new PaymentHubProxyRepo();

                    var response = paymentHubRepo.DStvGetDueAmountAndDate(dstvDueDate, "paymentplatform");
                    return Ok(response);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);

                return StatusCode(500, ex.Message);
            }
        }

        #endregion

        #endregion

    }
}
