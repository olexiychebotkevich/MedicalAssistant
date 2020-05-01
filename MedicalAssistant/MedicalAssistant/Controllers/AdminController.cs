using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalAssistant.DAL.Entities;
using MedicalAssistant.Helpers;
using MedicalAssistant.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace MedicalAssistant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles="Admin")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<DbUser> userManager;
        private readonly EFDbContext _dbcontext;
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;

        public AdminController(UserManager<DbUser> userManager, EFDbContext context, IConfiguration configuration, IHostingEnvironment env)
        {
            this.userManager = userManager;
            _dbcontext = context;
            _configuration = configuration;
            _env = env;
        }



        #region Doctor Registration
        [HttpPost("doctorregistration")]
        public async Task<IActionResult> DoctorRegistr([FromBody]DoctorRegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            //var userIdentity = _mapper.Map<DbUser>(model);

            var userIdentity = new DbUser { Email = model.Email, UserName = model.Email, PhoneNumber = model.PhoneNumber };
            var user = await userManager.CreateAsync(userIdentity, model.Password);


            if (user.Succeeded)
            {

                await userManager.AddToRoleAsync(userIdentity, "Doctor");
                DetailedDoctor doctorDetailed = new DetailedDoctor
                {
                    UserName = model.UserName,
                    UserSurname = model.UserSurname,
                    DateOfBirth = DateTime.Parse(model.DateOfBirth.ToShortDateString()),
                    Locality = model.Locality,
                    User = userManager.FindByEmailAsync(model.Email).Result,
                    ImagePath = "Images/DefaultImage",
                    DoctorSpecialty = model.DoctorSpecialty,
                    WorkExpirience = model.WorkExpirience
                };
                _dbcontext.Add(doctorDetailed);
                _dbcontext.SaveChanges();

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
        #endregion
    }
}