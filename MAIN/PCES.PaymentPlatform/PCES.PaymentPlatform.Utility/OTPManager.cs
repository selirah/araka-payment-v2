using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace PCES.PaymentPlatform.Utility
{
    public class OTPManager
    {
        public IConfiguration Configuration { get; }
        private bool FakeSend = true;
        private string MailServer = "";
        private int MailPort = 465;
        private bool EnableSsl = false;
        private string Sender = "";
        private string SenderPassword = "";
        private string Secret = "";
        private string UserName = "";

        public OTPManager(IConfiguration configuration)
        {
            Configuration = configuration;
            FakeSend = bool.Parse(Configuration["MailSettings:FakeEmailSend"]);
            MailServer = Configuration["MailSettings:Server"];// _configuration.GetSection("Mail").GetChildren().Where(c => c.Key == "Server").Select(c => c.Value).FirstOrDefault();
            MailPort = int.Parse(Configuration["MailSettings:Port"]);//int.Parse(_configuration.GetSection("Mail").GetChildren().Where(c => c.Key == "Port").Select(c => c.Value).FirstOrDefault());
            Sender = Configuration["MailSettings:Sender"];//_configuration.GetSection("Mail").GetChildren().Where(c => c.Key == "Sender").Select(c => c.Value).FirstOrDefault();
            SenderPassword = Configuration["MailSettings:SenderPassword"];//_configuration.GetSection("Mail").GetChildren().Where(c => c.Key == "SenderPassword").Select(c => c.Value).FirstOrDefault();
            EnableSsl = bool.Parse(Configuration["MailSettings:EnableSsl"]);//bool.Parse(_configuration.GetSection("Mail").GetChildren().Where(c => c.Key == "EnableSsl").Select(c => c.Value).FirstOrDefault());
            Secret = configuration["MailSettings:Secret"];
            UserName = configuration["MailSettings:UserName"];
        }

        private string ComposeEmailMessage(string messageTemplate, IEnumerable<KeyValuePair<string, object>> parameters)
        {
            string message = messageTemplate;
            foreach (var parameter in parameters)
            {
                string paramValue = parameter.Value != null && !string.IsNullOrEmpty(parameter.Value.ToString()) ? parameter.Value.ToString() : "";
                string parameterToReplace = string.Format("{{?Parameters.{0}?}}", parameter.Key);
                message = message.Replace(parameterToReplace, parameter.Value.ToString()).Replace(parameterToReplace.ToLower(), paramValue);
            }
            return message;
        }

        //public async Task<bool> SendEmail(string messageTemplate, string receipient, string subject, IEnumerable<KeyValuePair<string, object>> parameters)
        //{
        //    if (FakeSend)
        //    {
        //        return true;
        //    }
        //    using (SmtpClient client = new SmtpClient(MailServer, MailPort)
        //    {
        //        UseDefaultCredentials = false,
        //        EnableSsl = EnableSsl,
        //        Credentials = new NetworkCredential(UserName, SenderPassword),
        //        DeliveryMethod = SmtpDeliveryMethod.Network
        //    })
        //    {
        //        string message = ComposeEmailMessage(messageTemplate, parameters);
        //        MailMessage msg = new MailMessage(Sender, receipient)
        //        {
        //            Subject = subject,
        //            Body = message,
        //            IsBodyHtml = true
        //        };
        //        await client.SendMailAsync(msg);
        //        return true;
        //    }
        //}

        public async Task<bool> SendEmail(string messageTemplate, string receipient, string subject, IEnumerable<KeyValuePair<string, object>> parameters)
        {
            if (FakeSend)
            {
                return true;
            }
            string message = ComposeEmailMessage(messageTemplate, parameters);
            // var apiKey = Secret;
            var client = new SendGridClient(SenderPassword);
            var from = new EmailAddress(Sender, "Araka");
            var to = new EmailAddress(receipient);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, message, message);
            var response = await client.SendEmailAsync(msg);
            
            return true;
        }
    }
}
