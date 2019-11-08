using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalAssistant.Entities;
using MedicalAssistant.Helpers;
using MedicalAssistant.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MedicalAssistant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly UserManager<DbUser> userManager;
        private readonly SignInManager<DbUser> signInManager;

        public RegistrationController(UserManager<DbUser> userManager, SignInManager<DbUser> _signInManager)
        {
            this.userManager = userManager;
            this.signInManager = _signInManager;
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Reg([FromBody]RegistrationViewModel model)
        {

            //var userIdentity = _mapper.Map<DbUser>(model);
            var userIdentity = new DbUser { Email = model.Email,UserName = model.UserName,PhoneNumber=model.PhoneNumber};
            var user = await userManager.CreateAsync(userIdentity, model.Password);


            if (!user.Succeeded)
            {
                foreach (var el in user.Errors)
                {
                    return new BadRequestObjectResult(Errors.AddErrorToModelState("Error", el.Description, ModelState));
                }
            }

            model.Password = "";

            return Ok(model);
        }
    }
}