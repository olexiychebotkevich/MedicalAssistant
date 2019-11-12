using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using MedicalAssistant.Entities;
using MedicalAssistant.Helpers;
using MedicalAssistant.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicalAssistant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly UserManager<DbUser> userManager;
        private readonly SignInManager<DbUser> signInManager;
        private readonly EFDbContext _dbcontext;
        public RegistrationController(UserManager<DbUser> userManager, SignInManager<DbUser> _signInManager,EFDbContext context)
        {
            this.userManager = userManager;
            this.signInManager = _signInManager;
            this._dbcontext = context;
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
            else
            {
                DetailedUser userDetailed = new DetailedUser
                {
                    UserSurname = model.UserSurname,
                    DateOfBirth = DateTime.Parse(model.DateOfBirth.ToShortDateString()),
                    Locality = model.Locality,
                    User=userManager.FindByEmailAsync(model.Email).Result
                };
                _dbcontext.Add(userDetailed);
                _dbcontext.SaveChanges();
            }


            model.Password = "";

            return Ok("Account Created");
        }

        [HttpGet("getall")]
        public ICollection<DetailedUser> GetAll()
        {
               return _dbcontext.DetailedUsers.Include("User").ToList();
        }
    }
}