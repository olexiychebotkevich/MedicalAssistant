using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing.Imaging;
using System.IO;
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
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace MedicalAssistant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly UserManager<DbUser> userManager;
        private readonly EFDbContext _dbcontext;
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;

        public DoctorController(UserManager<DbUser> userManager, EFDbContext context, IConfiguration configuration, IHostingEnvironment env)
        {
            this.userManager = userManager;
            _dbcontext = context;
            _configuration = configuration;
            _env = env;
        }


        #region IsExist
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
                var detailedDoctor = await _dbcontext.DetailedDoctors.Include("User").AsNoTracking().SingleOrDefaultAsync(u => u.User.Id == id);

                if (detailedDoctor == null)
                {
                    return BadRequest(new { invalid = "Email does not exist" });
                }

                return Ok(detailedDoctor.Id);
            }
            catch (Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return NotFound();
            }

        }
        #endregion



        #region GetDoctor
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
                    .AsNoTracking()
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
                            Diagnos = i.Recipe.Diagnos
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
                    Sessions = MedicalSessionViewModels.OrderBy(s => s.Date).OrderByDescending(s => s.Date).ToList()

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

        #endregion


        #region GetDoctorPatient
        [Authorize]
        [HttpGet("GetDoctorPatient")]
        public IActionResult GetDoctorPatient([FromQuery]int? id)
        {

            try
            {
                DetailedPatient detailuser = _dbcontext.DetailedUsers
                    .Include("User")
                    .Include("Sessions.Recipe")
                    .Include("Sessions.DetailedDoctor")
                    .AsNoTracking()
                    .SingleOrDefault(u => u.Id == id);
                if (detailuser == null)
                {
                    return NotFound();
                }


                DoctorShortPatiantViewModel doctorShortPatiantViewModel = new DoctorShortPatiantViewModel
                {
                    PatientID = detailuser.Id,
                    PatientName = detailuser.UserName,
                    PatientSurname = detailuser.UserSurname,
                    PatientDateOfBirth = detailuser.DateOfBirth,
                    PatientPhoneNumber = detailuser.User.PhoneNumber,
                    PatientEmail = detailuser.User.Email,
                };
                return Ok(doctorShortPatiantViewModel);
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



        #endregion

       

        #region UpdateDoctorImage
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

        #endregion



        #region AddImage
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
        #endregion



        [Authorize]
        [HttpPost("SearchPatiantBySurname")]
        public async Task<IActionResult> SearchPatiantBySurname([FromBody]SearchFilterViewModel searchmodel)
        {
            try
            {
                var sessions = from s in _dbcontext.MedicalSessions
                               select s;
                if (!String.IsNullOrEmpty(searchmodel.searchPatientSurname) && searchmodel.DoctorId > 0)
                {
                    sessions = sessions.Where(s => s.DetailedPatient.UserSurname.Contains(searchmodel.searchPatientSurname)
                                           && s.DetailedDoctor.Id == searchmodel.DoctorId).Include("DetailedDoctor").Include("DetailedPatient").Include("Recipe").OrderByDescending(s => s.Date);
                }

                if (String.IsNullOrEmpty(searchmodel.searchPatientSurname) && searchmodel.DoctorId > 0)
                {
                    sessions = sessions.Where(s => s.DetailedDoctor.Id == searchmodel.DoctorId).Include("DetailedDoctor").Include("DetailedPatient").Include("Recipe").OrderByDescending(s => s.Date);
                }


                var medicalsessions = await sessions.AsNoTracking().ToListAsync();
                ICollection<DoctorMedicalSessionViewModel> MedicalSessionViewModels = new List<DoctorMedicalSessionViewModel>();
                if (medicalsessions != null)
                    foreach (var i in medicalsessions)
                    {
                        MedicalSessionViewModels.Add(new DoctorMedicalSessionViewModel
                        {
                            SessionId = i.ID,
                            Date = i.Date,
                            PatientName = i.DetailedPatient.UserName,
                            PatientSurname = i.DetailedPatient.UserSurname,
                            Diagnos = i.Recipe.Diagnos
                        });
                    }

                return Ok(MedicalSessionViewModels);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.InnerException);
            }
          

           

        }



    }
}