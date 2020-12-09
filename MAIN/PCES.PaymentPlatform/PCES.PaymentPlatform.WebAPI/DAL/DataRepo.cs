using DevExpress.XtraPrinting;
using DevExpress.XtraRichEdit;
using DevExpress.XtraRichEdit.API.Native;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PCES.PaymentPlatform.DomainClasses.Banking;
using PCES.PaymentPlatform.DomainClasses.Classifiers;
using PCES.PaymentPlatform.Repository.Application;
using PCES.PaymentPlatform.Utility;
using PCES.PaymentPlatform.WebAPI.DTO;
using PCES.PaymentPlatform.WebAPI.DTO.Quipu;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace PCES.PaymentPlatform.WebAPI.DAL
{
    public class DataRepo : IDisposable
    {
        public IConfiguration Configuration { get; }
        ApplicationRepository appRepo;

        public DataRepo()
        {
            appRepo = new ApplicationRepository();
        }
        public DataRepo(IConfiguration configuration)
        {
            Configuration = configuration;
            appRepo = new ApplicationRepository();
        }
        public void Dispose()
        {
            appRepo = null;
        }

        public List<ProductCategory> GetProductCategories()
        {
            return appRepo.GetProductCategories();
        }

        public List<Product> GetMerchantProducts(int productCategoryId, int merchantId)
        {
            return appRepo.GetMerchantProducts(productCategoryId, merchantId);
        }

        public List<CurrencyCode> GetCurrencyCodes()
        {
            return appRepo.GetCurrencyCodes();
        }

        public List<Culture> GetCultures()
        {
            return appRepo.GetCultures();
        }
        public RedirectDetails GetRedirectDetails(string payload)
        {
            XElement quipuResponse = XElement.Parse(payload);
            string quipuReference = (from item in quipuResponse.Descendants("OrderID")
                                     select item.Value).FirstOrDefault();
            return appRepo.GetRedirectDetails(quipuReference);
        }
        public int SavePaymentLog(string request, string response, bool success, string transactionId, string additionalData, string userId)
        {
            return appRepo.SavePaymentLog(request, response, success, transactionId, additionalData, userId);
        }

        public bool AuthenticateUser(string userName, string password)
        {
            byte[] data = System.Text.Encoding.ASCII.GetBytes(password);
            data = new System.Security.Cryptography.SHA256Managed().ComputeHash(data);
            String passwordHash = System.Text.Encoding.ASCII.GetString(data);

            return appRepo.AuthenticateUser(userName, passwordHash);
        }

        public bool RegisterUser(string userName,string password,string name,string phoneNumber, bool isBusiness )
        {
            byte[] data = System.Text.Encoding.ASCII.GetBytes(password);
            data = new System.Security.Cryptography.SHA256Managed().ComputeHash(data);
            String passwordHash = System.Text.Encoding.ASCII.GetString(data);

            return appRepo.RegisterUser(userName, passwordHash,name,phoneNumber,isBusiness);
        }

        internal string GetUserGUID(string userName)
        {
            return appRepo.GetUserGUID(userName);
        }

        internal string VerifyAccount(string userGuid)
        {
            return appRepo.VerifyUserEmail(userGuid);
        }

        public UserModel GetUserInfo(string userName)
        {
            return appRepo.GetUserDetails(userName);
        }

        public DeserializedRequest DeserializedRequest(string payload,string username)
        {
            var res = appRepo.DeserializeRequest(payload, username);
            return new DeserializedRequest { Amount = res.Amount, BeneficiaryPhoneNumber = res.BeneficiaryPhoneNumber, Currency = res.Currency, Description= res.Description
            , Language = res.Language, ProcessCode = res.ProcessCode, SmartCardNumber = res.SmartCardNumber, StudentId = res.StudentId, StudentName = res.StudentName
            , UserId = res.UserId, UserName = res.UserName, CustomerNumber = res.CustomerNumber, ContractNumber = res.ContractNumber, PhoneNumber = res.PhoneNumber
            , SubscriberNumber = res.SubscriberNumber, TokenId = res.TokenId, SelectedOffer = res.SelectedOffer, SelectedOption = res.SelectedOption, Duration = res.Duration
            , CheckInDate = res.CheckInDate, CheckOutDate = res.CheckOutDate, Date = res.Date, FeeType = res.FeeType, Name = res.Name, OrderNumber = res.OrderNumber, PassportNumber = res.PassportNumber
            , TravelFrom = res.TravelFrom, TravelTo = res.TravelTo, ProductCategoryId = res.ProductCategoryId, ProductId = res.ProductId, RedirectURL = res.RedirectURL};
        }

        internal void RequestPasswordReset(string emailAddress)
        {
            var user = appRepo.GetUserDetails(emailAddress);
            if (user!=null)
            {
                OTPManager otpManager = new OTPManager(Configuration);
                string email = appRepo.GetMessageTemplate("RESETPASSWORD");
                string subject = @"Araka Password Reset";
                string emailVerificationLink = $"{Configuration["UserSettings:PasswordResetEndpoint"]}?PID={GetUserGUID(emailAddress)}";
                otpManager.SendEmail(email, emailAddress, subject
                    , new List<KeyValuePair<string, object>>{
                new KeyValuePair<string, object>("EndPoint", emailVerificationLink),
                new KeyValuePair<string, object>("Name", user.Name)
                    }).GetAwaiter().GetResult();
            }
            
        }

        internal bool UpdatePassword(string processId, string password)
        {
            byte[] data = System.Text.Encoding.ASCII.GetBytes(password);
            data = new System.Security.Cryptography.SHA256Managed().ComputeHash(data);
            String passwordHash = System.Text.Encoding.ASCII.GetString(data);
            return appRepo.UpdatePassword(processId, passwordHash);
        }

        internal void SendVerificationEmail(Controllers.UserModel register,string userGuid)
        {
            OTPManager otpManager = new OTPManager(Configuration);
            string email = appRepo.GetMessageTemplate("EMAILVERIFICATION");
            string subject = @"Araka Verification";
            string emailVerificationLink = $"{Configuration["UserSettings:EmailVerificationEndpoint"]}?PID={userGuid}";
            otpManager.SendEmail(email, register.EmailAddress, subject
                , new List<KeyValuePair<string, object>>{
                new KeyValuePair<string, object>("EndPoint", emailVerificationLink),
                new KeyValuePair<string, object>("Name", register.Name)
                }).GetAwaiter().GetResult();
        }

        internal void AddMoneyToAccount(string response)
        {
            XElement quipuResponse = XElement.Parse(response);
            string quipuReference = (from item in quipuResponse.Descendants("OrderID")
                                     select item.Value).FirstOrDefault();
            var deserializedRequest = appRepo.GetTransactionDetailsByQuipuReference(quipuReference);
            int processCodeId = appRepo.GetProcessCodeId(deserializedRequest.ProcessCode);
            int debitAccount = appRepo.GetUserAccountId("DEFAULT");
            int creditAccount = appRepo.GetUserAccountId(deserializedRequest.UserName);
            string currencyISO = appRepo.GetCurrencyCodes().FirstOrDefault(x => x.NumericCode == deserializedRequest.Currency).Code;
            appRepo.BookTransaction(debitAccount, creditAccount, currencyISO, deserializedRequest.Amount, processCodeId, string.Empty);
        }

        internal void CompleteTransaction(string response)
        {

        }

        internal void SendPaymentApprovedEmail(string response)
        {
            PurchaseResponse purchaseResponse = DeserializeXML<PurchaseResponse>(response);
            SaveProcessReason(purchaseResponse.OrderID, purchaseResponse.OrderStatus);
            OTPManager otpManager = new OTPManager(Configuration);
            string email = appRepo.GetMessageTemplate("PAYMENTAPPROVED"); 
            string subject = @"Araka Payment Approved";
            string receipientEmail = GetPayeeEmail(purchaseResponse.OrderID);
            otpManager.SendEmail(email, receipientEmail, subject
                , new List<KeyValuePair<string, object>>{
                new KeyValuePair<string, object>("Description", purchaseResponse.OrderDescription)
                }).GetAwaiter().GetResult();
        }

        internal void PurchaseItem(string response)
        {

            XElement quipuResponse = XElement.Parse(response);
            string quipuReference = (from item in quipuResponse.Descendants("OrderID")
                                     select item.Value).FirstOrDefault();
            var deserializedRequest = appRepo.GetTransactionDetailsByQuipuReference(quipuReference);
            int processCodeId = appRepo.GetProcessCodeId(deserializedRequest.ProcessCode);
            int debitAccount = appRepo.GetUserAccountId(deserializedRequest.UserName);
            string merchantUserName = appRepo.GetMerchantUserNameFromProcessId(deserializedRequest.ProcessCode);
            int creditAccount = 0;
            string currencyISO = appRepo.GetCurrencyCodes().FirstOrDefault(x => x.NumericCode == deserializedRequest.Currency).Code;

            switch (deserializedRequest.ProcessCode.ToLower())
            {
                default:
                    creditAccount = appRepo.GetUserAccountId(merchantUserName);
                    break;
            }
            appRepo.BookTransaction(debitAccount, creditAccount, currencyISO, deserializedRequest.Amount,processCodeId , string.Empty);
        }

        internal void SendPaymentCancelledEmail(string response)
        {
            PurchaseResponse purchaseResponse = DeserializeXML<PurchaseResponse>(response);
            SaveProcessReason(purchaseResponse.OrderID, purchaseResponse.OrderStatus);
            OTPManager otpManager = new OTPManager(Configuration);
            string email = appRepo.GetMessageTemplate("PAYMENTCANCELLED");
            string subject = @"Araka Payment Cancelled";
            string receipientEmail = GetPayeeEmail(purchaseResponse.OrderID);
            otpManager.SendEmail(email, receipientEmail, subject
                , new List<KeyValuePair<string, object>>{
                new KeyValuePair<string, object>("Description", purchaseResponse.OrderDescription)
                }).GetAwaiter().GetResult();
        }

        internal void SendPaymentRejectedEmail(string response)
        {
            PurchaseResponse purchaseResponse = DeserializeXML<PurchaseResponse>(response);
            SaveProcessReason(purchaseResponse.OrderID, purchaseResponse.OrderStatus);
            OTPManager otpManager = new OTPManager(Configuration);
            string email = appRepo.GetMessageTemplate("PAYMENTDECLINED");
            string subject = @"Araka Payment Declined";
            string receipientEmail = GetPayeeEmail(purchaseResponse.OrderID);
            otpManager.SendEmail(email, receipientEmail, subject
                , new List<KeyValuePair<string, object>>{
                new KeyValuePair<string, object>("Description", purchaseResponse.OrderDescription)
                }).GetAwaiter().GetResult();
        }

        private string GetPayeeEmail(string reason)
        {
            ApplicationRepository applicationRepository = new ApplicationRepository();
            return applicationRepository.GetUserEmailByReason(reason);
        }

        private T DeserializeXML<T>(string xmlDocument)
        {
            XmlSerializer serializer = new XmlSerializer(typeof(T));
            using (TextReader reader = new StringReader(xmlDocument))
            {
                return (T)serializer.Deserialize(reader);
            }
        }

        public void SaveProcessReason(string orderID, string reason)
        {
            appRepo.SaveProcessReason(orderID, reason);
        }

        internal PayableFee GetFees(string payload, string username)
        {
            return appRepo.GetFees(payload, username);
        }

        public IEnumerable<TransactionHistory> GetTransactions(string username)
        {
            //  return appRepo.GetUserHistory(username);

            return appRepo.GetTransactionHistory(username);
        }

        public Client GetClientDetails(int userId)
        {
            return appRepo.GetClientDetails(userId);
        }

        public Client UpdateClientDetails(ClientRqDTO clientDTO)
        {
            Client client = new Client()
            {
                Address = clientDTO.Address,
                City = clientDTO.City,
                UserId = clientDTO.UserId,
                Country = clientDTO.Country,
                DateOfBirth = clientDTO.DateOfBirth,
                Email = clientDTO.Email,
                FirstName = clientDTO.FirstName,
                LastName = clientDTO.LastName,
                FullName = clientDTO.FullName,
                OtherName = clientDTO.OtherName,
                PhoneNumber = clientDTO.PhoneNumber
            };
            return appRepo.UpdateClientDetails(client);
        }

        public List<Beneficiary> GetBeneficiaries(int userId)
        {
            return appRepo.GetBeneficiaries(userId);
        }

        public Beneficiary AddBeneficiary(Beneficiary beneficiary)
        {
            return appRepo.AddBeneficiary(beneficiary);
        }

        public Beneficiary UpdateBeneficiary(Beneficiary beneficiary)
        {
            return appRepo.UpdateBeneficiary(beneficiary);
        }

        public bool DeleteBeneficiary(int beneficiaryId)
        {
            return appRepo.DeleteBeneficiary(beneficiaryId);
        }

        public async Task<byte[]> GetReceipt(string transactionid)
        {
            var res =  appRepo.GetReceipt(transactionid);
            var transaction = new {res.status, serviceDescription= res.serviceDescription.Replace("\"",""), amountPaid = $"{res.currency} {res.amountPaid}", charge = $"{res.currency} {res.charge}", totalAmountPaid= $"{res.currency} {res.totalAmountPaid}", res.transactionId,res.transactionDate };
            if (transaction!=null)
            {
            string bookmarkedTemplate = Configuration["Documents:RecieptBookmarkTemplate"].ToString();
            string savedPDF = string.Empty;
                using (RichEditDocumentServer wordProcessor = new RichEditDocumentServer())
                {
                    wordProcessor.LoadDocument(bookmarkedTemplate, DocumentFormat.OpenXml);
                    DevExpress.XtraRichEdit.API.Native.Document doc = wordProcessor.Document;

                    // Find & Replace Bookmarks
                    List<Bookmark> documentBookmarks = BookmarksHelper.GetDocumentBookmarks(doc);
                    try
                    {
                        doc.BeginUpdate();
                        foreach (var bookmark in documentBookmarks)
                        {
                            DocumentRange range = bookmark.Range;
                            var propertyInfo = transaction.GetType().GetProperties();
                            if (propertyInfo.Any(a=> a.Name == bookmark.Name))
                                doc.InsertText(range.Start, transaction.GetType().GetProperty(bookmark.Name).GetValue(transaction,null).ToString());
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.Error(ex);
                    }
                    finally
                    {
                        doc.EndUpdate();
                    }
                    PdfExportOptions options = new PdfExportOptions();
                    options.ImageQuality = PdfJpegImageQuality.Highest;
                    options.Compressed = false;
                    savedPDF = bookmarkedTemplate.Replace("Receipt-Bookmarked", transaction.transactionId.ToString()).Replace(".docx", ".pdf");
                    using (FileStream pdfFileStream = new FileStream(savedPDF, FileMode.Create))
                    {
                        wordProcessor.ExportToPdf(pdfFileStream, options);
                    }

                    var savedpdfFileStream = await System.IO.File.ReadAllBytesAsync(savedPDF);
                    return savedpdfFileStream;
                }
                
            }
            return null;
        }
        
        public IEnumerable<TransactionHistory> GetMerchantTransactions(string userName)
        {
            return appRepo.GetMerchantTransactions(userName);
        }
    }
}
