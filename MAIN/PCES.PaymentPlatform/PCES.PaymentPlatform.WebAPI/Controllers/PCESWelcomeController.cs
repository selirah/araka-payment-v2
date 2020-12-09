using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PCES.PaymentPlatform.DomainClasses;
using PCES.PaymentPlatform.Repository.Application;

namespace PCES.PaymentPlatform.WebAPI
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [ApiController]
    [Route("[controller]")]
    public class PCESWelcomeController: ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            //ApplicationRepository application = new ApplicationRepository();
            //return Ok(application.GetProductCategories());
            return Ok("Welcome to PCES");
        }
    }
}
