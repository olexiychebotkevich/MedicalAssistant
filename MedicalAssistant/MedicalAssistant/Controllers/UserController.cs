using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MedicalAssistant.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
using System.Drawing.Imaging;
using MedicalAssistant.Helpers;
using MedicalAssistant.ViewModels;
namespace MedicalAssistant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {


        private readonly UserManager<DbUser> userManager;
        private readonly EFDbContext _dbcontext;
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;
        public UserController(UserManager<DbUser> userManager, EFDbContext context, IConfiguration configuration, IHostingEnvironment env)
        {
            this.userManager = userManager;
            _dbcontext = context;
            _configuration = configuration;
            _env = env;
        }




        [Authorize]
        [HttpGet("IsPatientExist")]
        public async Task<IActionResult> IsPatientExist([FromQuery]int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            try
            {
                var detailuser = await _dbcontext.DetailedUsers.Include("User").AsNoTracking().FirstOrDefaultAsync(u => u.User.Id == id);

                if (detailuser == null)
                {
                    return BadRequest(new { invalid = "Email does not exist" });
                }

                return Ok(detailuser);
            }
            catch (Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return NotFound();
            }

        }


        [Authorize]
        [HttpGet("IsDoctorExist")]
        public async Task<IActionResult> IsDoctorExist([FromQuery]int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            try
            {
                var detailedDoctor = await _dbcontext.DetailedDoctors.Include("User").SingleOrDefaultAsync(u => u.User.Id == id);

                if (detailedDoctor == null)
                {
                    return BadRequest(new { invalid = "Email does not exist" });
                }

                return Ok(detailedDoctor);
            }
            catch (Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return NotFound();
            }

        }


        [Authorize]
        [HttpGet("GetPatient")]
        public IActionResult GetPatient([FromQuery]int? id)
        {

            try
            {
                DetailedPatient detailuser = _dbcontext.DetailedUsers.Include("User").Include("Sessions").SingleOrDefault(u => u.User.Id == id);
                if (detailuser == null)
                {
                    return NotFound();
                }

                ICollection<PatientMedicalSessionViewModel> patientMedicalSessionViewModels = new List<PatientMedicalSessionViewModel>();
                if (detailuser.Sessions!=null && detailuser.Sessions.Count != 0)
                    foreach (var i in detailuser.Sessions)
                    {
                        patientMedicalSessionViewModels.Add(new PatientMedicalSessionViewModel
                        {
                            SessionId = i.ID,
                            Date = i.Date,
                            DoctorName = i.DetailedDoctor.UserName,
                            DoctorSpecialty = i.DetailedDoctor.DoctorSpecialty,
                            DoctorSurname = i.DetailedDoctor.UserSurname
                        });
                    }


                DetailedUserViewModel detailedUserViewModel = new DetailedUserViewModel
                {
                    Id = detailuser.Id,
                    UserName = detailuser.UserName,
                    UserSurname = detailuser.UserSurname,
                    DateOfBirth = detailuser.DateOfBirth,
                    Locality = detailuser.Locality,
                    PhoneNumber = detailuser.User.PhoneNumber,
                    Email = detailuser.User.Email,
                    ImagePath = $"Images/{detailuser.ImagePath}",
                    Sessions = patientMedicalSessionViewModels

                };
                return Ok(detailedUserViewModel);
            }
            catch (ArgumentNullException e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return BadRequest(new { invalid = "Email does not exist" });
            }
            catch (Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return NotFound();
            }

        }


        [Authorize]
        [HttpGet("GetDoctor")]
        public IActionResult GetDoctor([FromQuery] int? id)
        {

            try
            {
                DetailedDoctor detaildoctor = _dbcontext.DetailedDoctors
                    .Include("User")
                    .Include("Sessions.Recipe")
                    .Include("Sessions.DetailedPatient")
                    .SingleOrDefault(u => u.User.Id == id);

                if (detaildoctor == null)
                {
                    return NotFound();
                }

                ICollection<DoctorMedicalSessionViewModel> MedicalSessionViewModels = new List<DoctorMedicalSessionViewModel>();
                if (detaildoctor.Sessions != null && detaildoctor.Sessions.Count != 0)
                    foreach (var i in detaildoctor.Sessions)
                    {
                        MedicalSessionViewModels.Add(new DoctorMedicalSessionViewModel
                        {
                            SessionId = i.ID,
                            Date = i.Date,
                            PatientName = i.DetailedPatient.UserName,
                            PatientSurname = i.DetailedPatient.UserSurname,
                            Diagnos=i.Recipe.Diagnos
                        });
                    }

                DetailedDoctorViewModel detailedDoctorViewModel = new DetailedDoctorViewModel
                {
                    Id = detaildoctor.Id,
                    UserName = detaildoctor.UserName,
                    UserSurname = detaildoctor.UserSurname,
                    DateOfBirth = detaildoctor.DateOfBirth,
                    DoctorSpecialty = detaildoctor.DoctorSpecialty,
                    Locality = detaildoctor.Locality,
                    Email = detaildoctor.User.Email,
                    PhoneNumber = detaildoctor.User.PhoneNumber,
                    WorkExpirience = detaildoctor.WorkExpirience,
                    ImagePath = $"Images/{detaildoctor.ImagePath}",
                    Sessions = MedicalSessionViewModels

                };
                return Ok(detailedDoctorViewModel);
            }
            catch (ArgumentNullException e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return BadRequest(new { invalid = "Email does not exist" });
            }
            catch (Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return NotFound();
            }

        }






        [Authorize]
        [HttpPut("UpdatePatientImage")]
        public async Task<IActionResult> UpdatePatientImage([FromBody]UpdatePatientImageViewModel patient)
        {
            if (patient == null)
            {
                return NotFound();
            }

            var userToUpdate = await _dbcontext.DetailedUsers.Include("User").SingleOrDefaultAsync(u => u.User.Id == patient.Id);

            try
            {

                var AddImageResultTask = Task.Run(() => AddImage(patient.ImagePath));
                //string imageName = AddImage(user.ImagePath);
                string imageName = await AddImageResultTask;

                userToUpdate.ImagePath = imageName;
                if (await TryUpdateModelAsync<DetailedPatient>(userToUpdate, "", s => s.ImagePath))
                {
                    try
                    {
                        await _dbcontext.SaveChangesAsync();
                        return Ok(userToUpdate);
                    }
                    catch (DbUpdateException ex)
                    {
                        Debug.WriteLine("{0} Exception caught.", ex);
                        ModelState.AddModelError("", "Unable to save changes. " +
                            "Try again, and if the problem persists, " +
                            "see your system administrator.");
                    }

                }


            }
            catch (Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return BadRequest();

            }
            return Ok(userToUpdate);

        }



        [Authorize]
        [HttpPut("UpdateDoctorImage")]
        public async Task<IActionResult> UpdateDoctorImage([FromBody]UpdateDoctorImageViewModel doctor)
        {
            if (doctor == null)
            {
                return NotFound();
            }

            var doctorToUpdate = await _dbcontext.DetailedDoctors.Include("User").SingleOrDefaultAsync(u => u.User.Id == doctor.Id);
            try
            {

                var AddImageResultTask = Task.Run(() => AddImage(doctor.ImagePath));
                string imageName = await AddImageResultTask;

                doctorToUpdate.ImagePath = imageName;
                if (await TryUpdateModelAsync<DetailedDoctor>(doctorToUpdate, "", s => s.ImagePath))
                {

                    try
                    {
                        await _dbcontext.SaveChangesAsync();
                        return Ok(doctorToUpdate);
                    }
                    catch (DbUpdateException ex)
                    {
                        Debug.WriteLine("{0} Exception caught.", ex);
                        ModelState.AddModelError("", "Unable to save changes. " +
                            "Try again, and if the problem persists, " +
                            "see your system administrator.");
                    }

                }
            }
            catch (Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);

            }

            return Ok(doctorToUpdate);

        }




        private string AddImage(string ImagePath)
        {

            string imageName = Guid.NewGuid().ToString() + ".jpg";


            string base64 = ImagePath;
            if (base64.Contains(","))
            {
                base64 = base64.Split(',')[1];
            }

            var bmp = base64.FromBase64StringToImage();

            string fileDestDir = _env.ContentRootPath;

            fileDestDir = Path.Combine(fileDestDir, _configuration.GetValue<string>("ImagesPath"));

            string fileSave = Path.Combine(fileDestDir, imageName);

            if (bmp != null)
            {

                int size = 1000;
                var image = ImageHelper.CompressImage(bmp, size, size);
                image.Save(fileSave, ImageFormat.Jpeg);
            }

            return imageName;
        }


        //[Authorize]
        //[HttpPost("SearchPatiantBySurname")]
        //public async Task<IActionResult> SearchPatiantBySurname([FromBody]SearchFilterViewModel searchmodel)
        //{

        //    if (searchmodel != null)
        //    {
        //        Recipe recipe;
        //        try
        //        {
        //            recipe = await _dbcontext.Recipes.Include("Patient").Include("Doctor").FirstAsync(r => r.Doctor.Id == searchmodel.DoctorId && r.Patient.UserSurname.Contains(searchmodel.searchPatientSurname));
        //        }

        //        catch(Exception ex)
        //        {
        //            return BadRequest(ex.Message);
        //        }

        //        DoctorPatiantViewModel searchedpatient = new DoctorPatiantViewModel
        //        {
        //            PatientID = recipe.Patient.Id,
        //            PatientName = recipe.Patient.UserName,
        //            PatientSurname = recipe.Patient.UserSurname
        //        };
        //        return Ok(searchedpatient);
        //    }
        //    else
        //        return BadRequest();

        //}
    }
}