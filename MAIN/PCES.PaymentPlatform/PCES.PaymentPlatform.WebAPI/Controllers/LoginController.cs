using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PCES.PaymentPlatform.WebAPI.DAL;
using System;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PCES.PaymentPlatform.WebAPI.Controllers
{
    //[EnableCors("AllowSpecificOrigin")]
    [ApiExplorerSettings(IgnoreApi = true)]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private IConfiguration _config;

        public LoginController(IConfiguration config)
        {
            _config = config;
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] LoginModel login)
        {
            IActionResult response = Unauthorized(new
            {
                Error = "Authentication failed for the provided credentials. If you are sure you entered the correct credentials, check email verification"

            });
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString, Username = user.EmailAddress, Name = user.Name, IsBusiness = user.IsBusiness, UserId = user.UserId });
            }

            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] UserModel register)
        {
            IActionResult response = BadRequest();
            DataRepo dataRepo = new DataRepo();
            if (dataRepo.GetUserInfo(register.EmailAddress) != null)
            {
                response = BadRequest(new { Error = "User with email already exists" });
                return response;
            }
            var user = RegisterUser(register);
            if (user != null)
            {
                response = Ok(new { EmailAddress = user.EmailAddress, IsBusiness = user.IsBusiness, Name = user.Name, PhoneNumber = user.PhoneNumber });
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("verifyaccount")]
        public IActionResult VerifyAccount([FromBody] VerifyInfo verifyInfo)
        {
            if (string.IsNullOrEmpty(verifyInfo.ProcessId))
            {
                return BadRequest("Missing Process ID parameter");
            }
            DataRepo dataRepo = new DataRepo(_config);
            string emailAddress = dataRepo.VerifyAccount(verifyInfo.ProcessId);
            if (string.IsNullOrEmpty(emailAddress))
            {
                return BadRequest("Invalid Process ID");
            }
            return Ok(new VerifyInfo { EmailAddress = emailAddress });
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("resetpassword")]
        public IActionResult ResetPassword([FromBody] VerifyInfo verifyInfo)
        {
            if (string.IsNullOrEmpty(verifyInfo.ProcessId))
            {
                return BadRequest("Some required parameters are missing");
            }
            DataRepo dataRepo = new DataRepo(_config);
            if(!dataRepo.UpdatePassword(verifyInfo.ProcessId, verifyInfo.Password))
            {
                return BadRequest("Process could not be completed at this time. Please try again");
            }
            return Ok(verifyInfo);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("requestpasswordreset")]
        public IActionResult RequestPasswordReset([FromBody] VerifyInfo verifyInfo)
        {
            if (string.IsNullOrEmpty(verifyInfo.EmailAddress))
            {
                return BadRequest("Some required parameters are missing");
            }
            DataRepo dataRepo = new DataRepo(_config);
            dataRepo.RequestPasswordReset(verifyInfo.EmailAddress);
            return Ok(verifyInfo);
        }

        private UserModel RegisterUser(UserModel register)
        {
            DataRepo dataRepo = new DataRepo(_config);
            if (dataRepo.RegisterUser(register.EmailAddress, register.Password, register.Name, register.PhoneNumber, register.IsBusiness))
            {
                string userGUID = dataRepo.GetUserGUID(register.EmailAddress);
                dataRepo.SendVerificationEmail(register, userGUID);
                return register;
            }
            return null;
        }

        private string GenerateJSONWebToken(UserModel userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
        new Claim(JwtRegisteredClaimNames.Sub, userInfo.EmailAddress),
        new Claim(JwtRegisteredClaimNames.Email, userInfo.EmailAddress),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserModel AuthenticateUser(LoginModel login)
        {
            UserModel user = null;
            DataRepo dataRepo = new DataRepo();
            //Validate the User Credentials      
            if (dataRepo.AuthenticateUser(login.EmailAddress, login.Password))
            {
                var userInfo = dataRepo.GetUserInfo(login.EmailAddress);
                user = new UserModel { EmailAddress = userInfo.EmailAddress, IsBusiness = userInfo.IsBusiness, Name = userInfo.Name, UserId = userInfo.UserId };
            }
            return user;
        }
    }

    public class VerifyInfo
    {
        public string ProcessId { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
    }

    public class LoginModel
    {
        [Required]
        public string EmailAddress { get; set; }
        [Required]
        public string Password { get; set; }
    }
    public class UserModel
    {
        [Required]
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        [Required]
        public string EmailAddress { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public bool IsBusiness { get; set; }
        public int? UserId { get; set; }
    }
}
