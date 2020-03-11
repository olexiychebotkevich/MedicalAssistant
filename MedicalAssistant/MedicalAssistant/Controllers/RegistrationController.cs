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


        public RegistrationController(UserManager<DbUser> userManager, SignInManager<DbUser> _signInManager, EFDbContext context)
        {
            this.userManager = userManager;
            signInManager = _signInManager;
            _dbcontext = context;

        }



        #region Patient Registration
        [HttpPost("patientregistration")]
        public async Task<IActionResult> PatientRegistr([FromBody]PatientRegistrationViewModel model)
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

                await userManager.AddToRoleAsync(userIdentity, "Patient");
                DetailedPatient userDetailed = new DetailedPatient
                {
                    UserName = model.UserName,
                    UserSurname = model.UserSurname,
                    DateOfBirth = DateTime.Parse(model.DateOfBirth.ToShortDateString()),
                    Locality = model.Locality,
                    User = userManager.FindByEmailAsync(model.Email).Result,
                    ImagePath = ""
                };
                _dbcontext.Add(userDetailed);
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
                    ImagePath = "",
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


        [HttpGet("getall")]
        public ICollection<DetailedPatient> GetAll()
        {
            return _dbcontext.DetailedUsers.Include("User").ToList();
        }
    }
}