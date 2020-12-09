using Dapper;
using DevExpress.XtraPrinting;
using Microsoft.Extensions.Configuration;
using Npgsql;
using PCES.PaymentPlatform.DomainClasses.Banking;
using PCES.PaymentPlatform.DomainClasses.Classifiers;
using PCES.PaymentPlatform.DomainClasses.SystemProcess;
using PCES.PaymentPlatform.Utility;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;

namespace PCES.PaymentPlatform.Repository.Application
{
    public class ApplicationRepository
    {
        private readonly SqlConnection connection;

        private static ConfigSettings _dbSettings;
        public static ConfigSettings DbSettings
        {
            get
            {
                if (_dbSettings == null)
                    _dbSettings = new ConfigSettings();
                return _dbSettings;
            }
        }


        public ApplicationRepository()
        {
            connection = new SqlConnection(DbSettings.MSSqlConnection);
        }

        public static IDbConnection SqlConnection(string connectionString)
        {
            var dbConnection = new SqlConnection(connectionString);
            dbConnection.Open();
            return dbConnection;
        }

        public int SaveProcess(string processCode, string userName, string additionalInfo)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    int processId = db.Query<int>(@"Select ProcessCodeId from ProcessCodes pc where Name = @ProcessCode ", new { ProcessCode = processCode }).FirstOrDefault();
                    int userId = db.Query<int>(@"Select UserId from Users u where Username = @UserName ", new { UserName = userName }).FirstOrDefault();
                    string sql = @"INSERT INTO Processes 
                                (ProcessCodeId, UserId, AdditionalInfo, FrequencyTypeId)
                                VALUES (@ProcessCodeId, @UserId, @AdditionalInfo,1) SELECT SCOPE_IDENTITY() ";
                    return db.Query<int>(sql, new { ProcessCodeId = processId, UserId = userId, AdditionalInfo = additionalInfo }).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public void SaveProcessReason(int savedProcessId, int reasonTypeId, string userName, string reason)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    int userId = db.Query<int>(@"Select UserId from Users u where Username = @UserName ", new { UserName = userName }).FirstOrDefault();
                    db.Execute(@"insert into ProcessReasons (ProcessId,ReasonTypeId,UserId,Reason) values(@ProcessId,@ReasonTypeId,@UserId,@Reason)", new { ProcessId = savedProcessId, ReasonTypeId = reasonTypeId, UserId = userId, Reason = reason });
                }

            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }

        }
        public int GetProcessCodeId(string processName)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    return db.Query<int>(@"SELECT pc.ProcessCodeId FROM dbo.ProcessCodes pc WHERE pc.Name = @ProcessName", new { ProcessName = processName }).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }
        public string GetProcessCode(string processId)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    return db.Query<string>(@"Select dbo.getprocesscode(@ProcessId)", new { ProcessId = processId }).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public string MerchantProductIdByProcessId(int userId, string processId)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    return db.Query<string>(@"Select p.ProductId from Products p 
                            join ProcessCodes pc on p.ProcessCodeId = pc.ProcessCodeId
                            join Merchants m on m.MerchantId = p.merchantid
                            join Users u on m.UserId = u.UserId
                            where pc.Name = dbo.getprocesscode(@ProcessId) and u.UserId = @UserId", new { ProcessId = processId, UserId = userId }).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public string GetMerchantUserNameFromProcessId(string processId)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    return db.Query<string>(@"select  u.Username from Users u 
                                                join Merchants m on u.UserId = m.UserId 
                                                join Products p on m.MerchantId = p.merchantid
                                                join ProcessCodes pc on p.ProcessCodeId = pc.ProcessCodeId 
                                                where pc.Name = dbo.getprocesscode(@ProcessId) ", new { ProcessId = processId }).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public void SaveProcessReason(string orderID, string reason)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    var orderIdReason = db.Query<ProcessReason>(@"select * from ProcessReasons where ReasonTypeId = 1 and Reason = @Reason", new { Reason = orderID }).FirstOrDefault();
                    db.Execute(@"insert into ProcessReasons (ProcessId,ReasonTypeId,UserId,Reason) values(@ProcessId,@ReasonTypeId,@UserId,@Reason)", new { ProcessId = orderIdReason.ProcessId, ReasonTypeId = 2, UserId = orderIdReason.UserId, Reason = reason });
                }

            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public int GetUserAccountId(string userName)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    string sql = @"select accountid from Accounts where name = @UserName";
                    return db.Query<int>(sql, new { UserName = userName }).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {

                Logger.Error(ex);
                throw ex;
            }
        }

        public decimal GetAccountBalance(int accountId)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    string sql = @"SELECT coalesce(a.MinimumAllowedBalance,0) + coalesce(a.AvailableBalance,0) from dbo.Accounts a  WHERE a.AccountId = @AccountId";
                    return db.Query<decimal>(sql, new { AccountId = accountId }).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public int BookTransaction(int debitAccountId, int creditAccountId, string currency, decimal amount, int processId, string details)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    decimal debitAccountBalance = GetAccountBalance(debitAccountId);
                    if (debitAccountBalance<amount)
                    {
                        throw new Exception("Insufficient funds on debit account");
                    }
                    else
                    {
                        db.Execute(@"UPDATE dbo.Accounts SET dbo.Accounts.AvailableBalance = dbo.Accounts.AvailableBalance - @Amount WHERE dbo.Accounts.AccountId = @DebitAccountId
UPDATE dbo.Accounts SET dbo.Accounts.AvailableBalance = dbo.Accounts.AvailableBalance + @Amount WHERE dbo.Accounts.AccountId = @CreditAccountId",new { DebitAccountId = debitAccountId, CreditAccountId = creditAccountId,Amount= amount });
                    }
                    string sql = @"INSERT INTO dbo.Transactions
(
    --TransactionId - column value is auto-generated
    DebitAccountId,
    CreditAccountId,
    Currency,
    Amount,
    ProcessId,
    Details,
    CreatedWhen,
    CreatedWhenUTC,
    TransactionTypeId
)
VALUES
(
    -- TransactionId - int
    @DebitAccountId, -- DebitAccountId - int
    @CreditAccountId, -- CreditAccountId - int
    @Currency, -- Currency - varchar
    @Amount, -- Amount - float
    @ProcessId, -- ProcessId - int
    @Details, -- Details - varchar
    GETDATE(), -- CreatedWhen - datetime
    GETUTCDATE(), -- CreatedWhenUTC - datetimeoffset
    1 -- TransactionTypeId - int
) 
 SELECT SCOPE_IDENTITY()
";
                   return db.Query<int>(sql, new { DebitAccountId = debitAccountId, CreditAccountId = creditAccountId, Currency =currency, Amount = amount,ProcessId =processId, Details =details}).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public RedirectDetails GetRedirectDetails(string orderId)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    return db.Query<RedirectDetails>(@"select p.ProcessId, JSON_VALUE(p.AdditionalInfo,'$.DeserializedRequest.RedirectURL') as RedirectURL
                                            from Processes p
                                            where ProcessId in (select pr.ProcessId from ProcessReasons pr where pr.Reason = @OrderID)", new{OrderID=orderId}).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public int SavePaymentLog(string request, string response, bool success, string transactionId, string additionalData, string userId)
        {
            try
            {
                string sql = @"INSERT INTO PaymentLogs
                                        (Request
                                        ,Response
                                        ,Success
                                        ,TransactionId
                                        ,UserId
                                        ,AdditionalData
                                        ,CreatedWhen)
                                   VALUES
                                        (@Request
                                        ,@Response
                                        ,@Success
                                        ,@TransactionId
                                        ,@UserId
                                        ,@AdditionalData
                                        ,GETUTCDATE()) SELECT SCOPE_IDENTITY()";

                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    var returnID = db.Query<int>(sql, new
                    {
                        Request = request,
                        Response = response,
                        Success = success,
                        TransactionId = transactionId,
                        UserId = userId,
                        AdditionalData = additionalData
                    }).SingleOrDefault();

                    return returnID;
                }

            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public DeserializedRequest GetTransactionDetailsByQuipuReference(string orderId)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    return db.Query<DeserializedRequest>(@"select SELECT JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.ProcessCode') AS ProcessCode
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.UserName') AS UserName
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.UserId') AS UserId
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.Amount') AS Amount
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.BeneficiaryPhoneNumber') AS BeneficiaryPhoneNumber
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.StudentId') AS StudentId
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.StudentName') AS StudentName
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.SmartCardNumber') AS SmartCardNumber
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.Currency') AS Currency
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.Description') AS 'Description'
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.Language') AS 'Language'
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.CustomerNumber') AS CustomerNumber
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.PhoneNumber') AS PhoneNumber
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.ContractNumber') AS ContractNumber
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.SubscriberNumber') AS SubscriberNumber
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.TokenId') AS TokenId
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.SelectedOffer') AS SelectedOffer
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.SelectedOption') AS SelectedOption
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.Duration') AS Duration
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.FeeType') AS FeeType
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.Name') AS Name
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.CheckInDate') AS CheckInDate
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.CheckOutDate') AS CheckOutDate
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.OrderNumber') AS OrderNumber
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.PassportNumber') AS PassportNumber
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.TravelFrom') AS TravelFrom
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.TravelTo') AS TravelTo
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.Date') AS 'Date'
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.ProcessId') AS ProcessId
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.ProductCategoryId') AS ProductCategoryId
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.ProductId') AS ProductId
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.EmailAddress') AS EmailAddress
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.Reference') AS Reference
, JSON_VALUE(p.AdditionalInfo, '$.DeserializedRequest.RedirectURL') AS RedirectURL

 FROM dbo.Processes p
                                            where ProcessId in (select pr.ProcessId from ProcessReasons pr where pr.Reason = @OrderID)", 
                                            new { OrderID = orderId }).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public bool UpdatePassword(string processId, string password)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    string sql = @"select Username from Users u where cast(uuid as varchar(50)) = @UserGuid";
                    string userEmail = db.Query<string>(sql, new { UserGuid = processId }).FirstOrDefault();
                    if (!string.IsNullOrEmpty(userEmail))
                    {
                        sql = @"update Users set Password = @Password where cast(uuid as varchar(50)) = @UserGuid";
                        db.Execute(sql, new { UserGuid = processId, Password = password });
                    }
                    return true;
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public string GetUserGUID(string userName)
        {
            using (var db = SqlConnection(DbSettings.MSSqlConnection))
            {
                string sql = @"select cast(uuid as varchar(50)) from Users u where Username = @UserName";
                return db.Query<string>(sql, new { UserName = userName }).FirstOrDefault();
            }
        }

        public DeserializedRequest DeserializeRequest(string payload, string username)
        {
            using (var db = SqlConnection(DbSettings.MSSqlConnection))
            {
                string sql = @"SELECT * from DeserializeRequest(@Payload,@Username)";
                return db.Query<DeserializedRequest>(sql, new { Payload = payload, Username = username }).FirstOrDefault();
            }
        }

        public bool UpdatePaymentLog(int paymentLogId, string response, bool success, string transactionId, string additionalData)
        {
            try
            {
                string sql = @"UPDATE PaymentLogs SET
                                         Response = @Response
                                        ,Success = @Success
                                        ,TransactionId = @TransactionId
                                        ,AdditionalData = @AdditionalData
                                       WHERE PaymentLogId = @PaymentLogId";

                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    db.Execute(sql, new
                    {
                        PaymentLogId = paymentLogId,
                        Response = response,
                        Success = success,
                        TransactionId = transactionId,
                        AdditionalData = additionalData
                    });
                }

            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }

            return true;
        }


        public List<ProductCategory> GetProductCategories()
        {
            List<ProductCategory> productCategories;

            Dictionary<int, ProductCategory> productCategoryDictionary = new Dictionary<int, ProductCategory>();
            try
            {
                string sql = @"select pc.*, 1 SPLIT1, pcc.Form, p.* from ProductCategories pc join Products p on pc.ProductCategoryId = p.ProductCategoryId join ProcessCodes pcc on pcc .ProcessCodeId = p.ProcessCodeId";

                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    productCategories = db.Query<ProductCategory, Product, ProductCategory>(
                       sql, (productCategory, merchant) =>
                       {
                           if (!productCategoryDictionary.TryGetValue(productCategory.ProductCategoryId, out ProductCategory productCategoryEntry))
                           {
                               productCategoryEntry = productCategory;
                               productCategoryEntry.Products = new List<Product>();
                               productCategoryDictionary.Add(productCategory.ProductCategoryId, productCategory);
                           }

                           productCategoryEntry.Products.Add(merchant);
                           return productCategoryEntry;

                       }, splitOn: "SPLIT1"
                       ).ToList();
                }

                return productCategoryDictionary.Values.ToList();

            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }

        }

        public PayableFee GetFees(string payload, string username)
        {
            using (var db = SqlConnection(DbSettings.MSSqlConnection))
            {
                string sql = @"SELECT * from DeserializeRequest(@Payload,@Username)";
                var deserializedRequest = db.Query<DeserializedRequest>(sql, new { Payload = payload, Username = username }).FirstOrDefault();
                string feeFunction = db.Query<string>(@"select Feecalculationfunction from ProcessCodes pc where Name = @ProcessCode", new { ProcessCode = deserializedRequest.ProcessCode }).FirstOrDefault();
                if (!string.IsNullOrEmpty(feeFunction))
                {
                    decimal fee = deserializedRequest.Amount * 0.03m;
                    return new PayableFee { VAT = Math.Round(fee * 0.16m, 2), fee = Math.Round(fee, 2) };
                }
                return new PayableFee { VAT = 0, fee = 0 };
            }
        }

        public TransactionHistory GetReceipt(string transactionid)
        {
            using (var db = SqlConnection(DbSettings.MSSqlConnection))
            {
                string query = @"select pr.Reason as status, p.ProcessId as transactionId, p.CreatedWhen as transactionDate, 
                                JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Amount') as amountPaid, 
                                JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Description') as transactionDescription,
                                JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Fee') as charge, 
                                JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.VAT') as VAT, 
                                JSON_VALUE(p.AdditionalInfo,'$.Payload.data') as data,
                                dbo.getcurrencycode(cast(COALESCE(JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Currency'),'0') as INT )) as currency,
                                JSON_VALUE(p.AdditionalInfo,'$.DeserializedRequest.ProcessCode') as serviceDescription
                                from Processes p left join ProcessReasons pr on p.ProcessId = pr.ProcessId where pr.ReasonTypeId = 2 and 
                                p.ProcessId = @TransactionId order by p.CreatedWhen desc";
                
                return db.Query<TransactionHistory>(query, new { TransactionId = int.Parse(transactionid) }).FirstOrDefault();
                
            }
        }

        public IEnumerable<TransactionHistory> GetMerchantTransactions(string userName)
        {
            using (var db = SqlConnection(DbSettings.MSSqlConnection))
            {
                int userId = db.Query<int>(@"Select UserId from Users u where Username = @UserName ", new { UserName = userName }).FirstOrDefault();
                int merchantId = db.Query<int>(@"Select m.MerchantId from Merchants m where m.UserId = @UserId ", new { UserId = userId }).FirstOrDefault();
                string query = @"select pr.Reason as status, p.ProcessId as transactionId, p.CreatedWhen as transactionDate, 
                                JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Amount') as amountPaid, 
                                JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Description') as transactionDescription,
                                JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Fee') as charge, 
                                JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.VAT') as VAT, 
                                JSON_VALUE(p.AdditionalInfo,'$.Payload.data') as data,
                                dbo.getcurrencycode(cast(COALESCE(JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Currency'),'0') as INT )) as currency,
                                JSON_VALUE(p.AdditionalInfo,'$.DeserializedRequest.ProcessCode') as serviceDescription,
                                COALESCE(c.FullName,JSON_VALUE(p.AdditionalInfo,'$.DeserializedRequest.Name'),'') as Customer,
                                'Card' as Channel
                                from Processes p left join ProcessReasons pr on p.ProcessId = pr.ProcessId 
                                left outer join Clients c  on p.UserId = c.UserId 
                                where cast(COALESCE(JSON_VALUE(p.AdditionalInfo,'$.DeserializedRequest.ProductId'),'0') as INT ) 
                                in (select p2.ProductId from Products p2 where (p2.merchantid = @MerchantId or p2.merchantid in (SELECT m2.merchantid FROM merchants m2 WHERE m2.ParentMerchantId = @MerchantId))) and
                                pr.ReasonTypeId = 2  order by p.CreatedWhen desc";
                return db.Query<TransactionHistory>(query, new { MerchantId = merchantId }).ToList();
            }
        }

        public string GetUserEmailByReason(string reason)
        {
            using (var db = SqlConnection(DbSettings.MSSqlConnection))
            {
                int userId = db.Query<int>(@"select UserId from ProcessReasons pr where Reason = @Reason ", new { Reason = reason }).FirstOrDefault();
                return db.Query<string>(@"select Username from Users u where UserId = @UserId", new { UserId = userId }).FirstOrDefault();
            }

        }

        public List<Product> GetMerchantProducts(int productCategoryId, int merchantId)
        {
            try
            {
                string sql = @"SELECT p.Name, p.ProductId, pc.Guid, pc.Form FROM Merchants m 
                              JOIN Products p on m.MerchantId = p.merchantid
                              JOIN ProcessCodes pc on pc.ProcessCodeId = p.ProcessCodeId
                              WHERE m.MerchantId=@MerchantId AND p.ProductCategoryId= @ProductCategoryId";

                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    return db.Query<Product>(sql, new { MerchantId = merchantId, ProductCategoryId = productCategoryId }
                         ).ToList();
                }

            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }

        }

        public bool AuthenticateUser(string userName, string password)
        {
            try
            {
                string sql = @"select 1 from Users u where Username = @UserName and Password = @Password and IsVerified = 1";
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    return db.Query<bool>(sql, new { UserName = userName, Password = password }).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public UserModel GetUserDetails(string userName)
        {
            string sql = @"SELECT distinct u.UserId, u.Username EmailAddress, coalesce(c.FullName,m.Name) as Name
                            , case when m.MerchantId is null then 0 else 1 end as IsBusiness
                            from Users u
                            left outer join Clients c on u.UserId = c.UserId
                            left outer join Merchants m on u.UserId = m.MerchantId 
                            where u.Username=@UserName";
            using (var db = SqlConnection(DbSettings.MSSqlConnection))
            {
                return db.Query<UserModel>(sql, new { UserName = userName }).FirstOrDefault();
            }
        }

        public bool RegisterUser(string userName, string password, string name, string phoneNumber, bool isBusiness)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    string sql = @"insert into Users (Username,Password,ApplicationId,PhoneNumber,IsVerified) values(@UserName,@Password,@ApplicationId,@PhoneNumber,@IsVerified) SELECT SCOPE_IDENTITY() ";
                    int userId = db.Query<int>(sql, new { UserName = userName, Password = password, ApplicationId = 1, Name = name, PhoneNumber = phoneNumber, IsVerified = false }).FirstOrDefault();
                    int accountId = db.Query<int>(@"insert into Accounts (AccountNumber, MinimumAllowedBalance, MaximumAllowedBalance, Name,Balance,AvailableBalance, Currency, UserId)
                                                    values (@UserName,0,0,@UserName,0,0,'USD',@UserId)",new { UserName = userName, UserId = userId }).FirstOrDefault();
                    if (isBusiness)
                    {
                        sql = @"insert into Merchants (Name,UserId) values(@Name,@UserId)";
                        db.Execute(sql, new { Name = name, UserId = userId });
                    }
                    else
                    {
                        sql = @"insert into Clients (FullName,UserId, PhoneNumber, Email) values(@Name,@UserId,@PhoneNumber,@Username)";
                        db.Execute(sql, new { Name = name, UserId = userId, PhoneNumber = phoneNumber, Username = userName });
                    }
                    return true;
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public string VerifyUserEmail(string userGuid)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    string sql = @"select Username from Users u where cast(uuid as varchar(50)) = @UserGuid";
                    string userEmail = db.Query<string>(sql, new { UserGuid = userGuid }).FirstOrDefault();
                    if (!string.IsNullOrEmpty(userEmail))
                    {
                        sql = @"update Users set IsVerified = 1 where cast(uuid as varchar(50)) = @UserGuid";
                        db.Execute(sql, new { UserGuid = userGuid });
                    }
                    return userEmail;
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }


        public List<Beneficiary> GetBeneficiaries(int userId)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    string sql = @"select * from Beneficiaries b where b.UserId = @UserId";
                    return db.Query<Beneficiary>(sql, new { UserId = userId }).ToList();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public Beneficiary AddBeneficiary(Beneficiary beneficiary)
        {
            try
            {
                string sql = @"INSERT INTO Beneficiaries (Name, PhoneNumber, StudentId, BankAccount, Email, AdditionalInfo, UserId)
                              VALUES(@Name, @PhoneNumber, @StudentId, @BankAccount, @Email, @AdditionalInfo, @UserId) SELECT SCOPE_IDENTITY()";

                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    var beneficiaryId = db.Query<int>(sql, beneficiary).FirstOrDefault();
                    beneficiary.BeneficiaryId = beneficiaryId;
                }

            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }

            return beneficiary;
        }

        public Beneficiary UpdateBeneficiary(Beneficiary beneficiary)
        {
            try
            {
                string sql = @"UPDATE Beneficiaries SET 
                            Name = @Name, 
                            PhoneNumber = @PhoneNumber, 
                            StudentId = @StudentId, 
                            BankAccount = @BankAccount, 
                            Email = @Email, 
                            AdditionalInfo = @AdditionalInfo
                            WHERE BeneficiaryId = @BeneficiaryId and UserId = @UserId ";

                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    db.Execute(sql, beneficiary);
                }

            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }

            return beneficiary;
        }

        public bool DeleteBeneficiary(int beneficiaryId)
        {
            try
            {
                string sql = @"DELETE FROM Beneficiaries WHERE BeneficiaryId = @BeneficiaryId";

                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    db.Execute(sql, new { BeneficiaryId = beneficiaryId});

                    return true;
                }

            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }

        }

        public Client GetClientDetails(int userId)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    string sql = @"select * from Clients c where c.UserId = @UserId";
                    return db.Query<Client>(sql, new { UserId = userId }).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }



        public Client UpdateClientDetails(Client client)
        {
            try
            {
                string sql = @"UPDATE Clients SET 
                             FullName = @FullName, 
                             FirstName = @FirstName, 
                             OtherName = @OtherName, 
                             LastName = @LastName,
                             DateOfBirth = @DateOfBirth, 
                             Address = @Address, 
                             Email = @Email,
                             PhoneNumber = @PhoneNumber,
                             Country = @Country, 
                             City = @City
                             WHERE UserId = @UserId";

                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    db.Execute(sql, client);
                }

            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }

            return client;
        }



        public List<CurrencyCode> GetCurrencyCodes()
        {
            try
            {
                string sql = @"SELECT * FROM CurrencyCodes WHERE NumericCode IS NOT NULL";

                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    return db.Query<CurrencyCode>(sql).ToList();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }

        }

        public string GetMessageTemplate(string codeName)
        {
            try
            {
                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    string sql = @"select m.Content from messagetemplates m where codename =@CodeName";
                    return db.Query<string>(sql, new { CodeName = codeName }).FirstOrDefault();
                }
            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public List<Culture> GetCultures()
        {
            try
            {
                string sql = @"SELECT * FROM Cultures";

                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    return db.Query<Culture>(sql).ToList();
                }

            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }

        }

        public List<Merchant> GetMerchants()
        {
            try
            {
                string sql = @"SELECT * FROM Merchants";

                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    return db.Query<Merchant>(sql).ToList();
                }

            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }

        }


        public int AddMerchant(string name, int? parentMerchantId, byte[] image, string userId)
        {
            try
            {
                string sql = @"INSERT INTO Merchants
                                        (Name
                                        ,ParentMerchantId
                                        ,Image
                                        ,UserId
                                        ,CreatedWhen)
                                   VALUES
                                        (@Name
                                        ,@ParentMerchantId
                                        ,@Image
                                        ,@UserId
                                        ,GETUTCDATE()) SELECT SCOPE_IDENTITY()";

                using (var db = SqlConnection(DbSettings.MSSqlConnection))
                {
                    var returnID = db.Query<int>(sql, new
                    {
                        Name = name,
                        ParentMerchantId = parentMerchantId,
                        Image = image,
                        UserId = userId

                    }).SingleOrDefault();

                    return returnID;
                }

            }
            catch (System.Exception ex)
            {
                Logger.Error(ex);
                throw ex;
            }
        }

        public IEnumerable<TransactionHistory> GetUserHistory(string userName)
        {
            using (var db = SqlConnection(DbSettings.MSSqlConnection))
            {
                string query = @"select ProcessId as transactionId
, cast(CreatedWhen as varchar) as transactionDate
,cast(COALESCE(JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Amount'),'0') as decimal(10,4) ) as amountPaid
,JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Description') as transactionDescription
,cast(COALESCE(JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Fee'),'0') as decimal(10,4) ) as charge
,cast(COALESCE(JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.VAT'),'0') as decimal(10,4) ) as VAT
,JSON_VALUE(p.AdditionalInfo,'$.Payload.data') as data
from Processes p 
where UserId  = @UserId 
order by CreatedWhen desc ";
                int userId = db.Query<int>(@"Select UserId from Users u where Username = @UserName ", new { UserName = userName }).FirstOrDefault();
                return db.Query<TransactionHistory>(query, new { UserId = userId }).ToList();
            }

        }



        public IEnumerable<TransactionHistory> GetTransactionHistory(string userName)
        {
            using (var db = SqlConnection(DbSettings.MSSqlConnection))
            {
                string query = @"select pr.Reason as status, p.ProcessId as transactionId, p.CreatedWhen as transactionDate, 
JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Amount') as amountPaid, 
JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Description') as transactionDescription,
JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Fee') as charge, JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.VAT') as VAT, 
JSON_VALUE(p.AdditionalInfo,'$.Payload.data') as data,
                                dbo.getcurrencycode(cast(COALESCE(JSON_VALUE(p.AdditionalInfo,'$.QuipuOrder.Currency'),'0') as integer )) as currency
from Processes p left join ProcessReasons pr on p.ProcessId = pr.ProcessId where pr.ReasonTypeId = 2 and p.UserId = @UserId order by p.CreatedWhen desc";
                int userId = db.Query<int>(@"Select UserId from Users u where Username = @UserName ", new { UserName = userName }).FirstOrDefault();
                return db.Query<TransactionHistory>(query, new { UserId = userId }).ToList();
            }

        }
    }

    public class RedirectDetails
    {
        public string RedirectURL { get; set; }
        public int ProcessId { get; set; }
    }

    public class TransactionHistory
    {
        public int transactionId { get; set; }
        public string transactionDate { get; set; }
        public decimal amountPaid { get; set; }
        public string transactionDescription { get; set; }
        public string  currency { get; set; }
        public decimal charge { get; set; }
        public decimal VAT { get; set; }
        public string data { get; set; }
        public string status { get; set; }
        public string serviceDescription { get; set; }
        public decimal totalAmountPaid { get { return decimal.Add(decimal.Add(this.amountPaid, this.charge),this.VAT); } }
        public string Customer { get; set; }
        public string Channel { get; set; }
    }

    public class PayableFee
    {
        public decimal VAT { get; set; }
        public decimal fee { get; set; }
    }

    public class UserModel
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailAddress { get; set; }
        public bool IsBusiness { get; set; }
        public int UserId { get; set; }
    }

    public class DeserializedRequest
    {
        public string ProcessCode { get; set; }
        public string UserName { get; set; }
        public int UserId { get; set; }
        public decimal Amount { get; set; }
        public string BeneficiaryPhoneNumber { get; set; }
        public string StudentId { get; set; }
        public string StudentName { get; set; }
        public string SmartCardNumber { get; set; }
        public int Currency { get; set; }
        public string Description { get; set; }
        public string Language { get; set; }
        public string CustomerNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string ContractNumber { get; set; }
        public string SubscriberNumber { get; set; }
        public string TokenId { get; set; }
        public string SelectedOffer { get; set; }
        public string SelectedOption { get; set; }
        public string Duration { get; set; }
        public string FeeType { get; set; }
        public string Name { get; set; }
        public string CheckInDate { get; set; }
        public string CheckOutDate { get; set; }
        public string OrderNumber { get; set; }
        public string PassportNumber { get; set; }
        public string TravelFrom { get; set; }
        public string TravelTo { get; set; }
        public string Date { get; set; }
        public string ProductCategoryId { get; set; }
        public string ProductId { get; set; }
        public string RedirectURL { get; set; }
    }
}
