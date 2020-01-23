using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using MedicalAssistant.BLL.Interfaces;
using MedicalAssistant.DAL.Entities;
using MedicalAssistant.Helpers;
using MedicalAssistant.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

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
            //if (!ModelState.IsValid)
            //{
            //    var errors = CustomValidator.GetErrorsByModel(ModelState);
            //    return BadRequest(errors);
            //}

            //var userIdentity = _mapper.Map<DbUser>(model);

            var userIdentity = new DbUser { Email = model.Email,UserName = model.Email, PhoneNumber=model.PhoneNumber};
            var user = await userManager.CreateAsync(userIdentity, model.Password);


            if (user.Succeeded)
            {
                if (model.DoctorSpecialty != null && model.WorkExpirience != null)
                {
                    DetailedDoctor doctorDetailed = new DetailedDoctor
                    {
                        UserName = model.UserName,
                        UserSurname = model.UserSurname,
                        DateOfBirth = DateTime.Parse(model.DateOfBirth.ToShortDateString()),
                        Locality = model.Locality,
                        WorkExpirience = model.WorkExpirience,
                        DoctorSpecialty = model.DoctorSpecialty,
                        User = userManager.FindByEmailAsync(model.Email).Result

                    };

                    _dbcontext.Add(doctorDetailed);
                    _dbcontext.SaveChanges();
                }
                else
                {
                    DetailedUser userDetailed = new DetailedUser
                    {
                        UserName = model.UserName,
                        UserSurname = model.UserSurname,
                        DateOfBirth = DateTime.Parse(model.DateOfBirth.ToShortDateString()),
                        Locality = model.Locality,
                        User = userManager.FindByEmailAsync(model.Email).Result
                    };
                    _dbcontext.Add(userDetailed);
                    _dbcontext.SaveChanges();
                }
            }
            else
            {
            

                foreach (var el in user.Errors)
                {
                    return new BadRequestObjectResult(Errors.AddErrorToModelState("Error", el.Description, ModelState));
                }
            }


            return Ok("Account Created");
        }

        [HttpGet("getall")]
        public ICollection<DetailedUser> GetAll()
        {
               return _dbcontext.DetailedUsers.Include("User").ToList();
        }
    }
}