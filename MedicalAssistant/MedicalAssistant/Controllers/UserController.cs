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
        public UserController(UserManager<DbUser> userManager,EFDbContext context, IConfiguration configuration, IHostingEnvironment env)
        {
            this.userManager = userManager;
            _dbcontext = context;
            _configuration = configuration;
            _env = env;
        }




        [Authorize]
        [HttpGet("IsPatientExist")]
        public async Task<IActionResult> IsPatientExist([FromQuery]int ? id)
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
                    return NotFound();
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
        public async Task<IActionResult> IsDoctorExist([FromQuery]int ? id)
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
                    return NotFound();
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
        public object GetPatient([FromQuery]int? id)
        {

            try
            {
                DetailedUser detailuser = _dbcontext.DetailedUsers.Include("User").SingleOrDefault(u => u.User.Id == id);
                if (detailuser == null)
                {
                    return NotFound();
                }

                DetailedUserViewModel viewModel = new DetailedUserViewModel
                {
                    Id = detailuser.Id,
                    UserName =  detailuser.UserName,
                    UserSurname = detailuser.UserSurname,
                    DateOfBirth = detailuser.DateOfBirth,
                    User=detailuser.User,
                    Locality = detailuser.Locality,
                    ImagePath = detailuser.ImagePath,
                    recipes = _dbcontext.Recipes.Include(r => r.Patient).Include(r=>r.Doctor).Where(r => r.Patient.Id == detailuser.Id).ToList()

                };
                return viewModel;
            }
            catch (ArgumentNullException e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return BadRequest(new { invalid = "Email does not exist" });
            }
            catch (Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return BadRequest(new { invalid = "Email does not exist" });
            }

        }


        [Authorize]
        [HttpGet("GetDoctor")]
        public object GetDoctor([FromQuery] int ? id)
        {

            try
            {
                DetailedDoctor detaildoctor = _dbcontext.DetailedDoctors.Include("User").SingleOrDefault(u => u.User.Id == id);

                if (detaildoctor == null)
                {
                    return NotFound();
                }

                DetailedDoctorViewModel viewModel = new DetailedDoctorViewModel
                {
                    Id = detaildoctor.Id,
                    UserName = detaildoctor.UserName,
                    UserSurname = detaildoctor.UserSurname,
                    DateOfBirth = detaildoctor.DateOfBirth,
                    DoctorSpecialty = detaildoctor.DoctorSpecialty,
                    Locality = detaildoctor.Locality,
                    User = detaildoctor.User,
                    WorkExpirience = detaildoctor.WorkExpirience,
                    ImagePath=detaildoctor.ImagePath,
                    recipes = _dbcontext.Recipes.Include(r=>r.Patient).Where(r => r.Doctor.Id == detaildoctor.Id).ToList()

                };
                return viewModel;
            }
            catch (ArgumentNullException e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return BadRequest(new { invalid = "Email does not exist" });
            }
            catch (Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return BadRequest(new { invalid = "Email does not exist" });
            }

        }






        [Authorize]
        [HttpPut("UpdateUser")]
        public DetailedUser UpdateUser([FromBody]DetailedUser user)
        {
            DetailedUser detailuser = null;
           
            try
            {
                detailuser = _dbcontext.DetailedUsers.Include("User").Single(u => u.User.Id == user.Id);
                if(detailuser!=null)
                {
                    string imageName = Guid.NewGuid().ToString() + ".jpg";
                    string base64 = user.ImagePath;
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

                     detailuser.ImagePath = imageName;
                    _dbcontext.Update(detailuser);
                    _dbcontext.SaveChanges();

                }
               
               
            }
            catch (Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
            }
            return detailuser;
        }



        [Authorize]
        [HttpPut("UpdateDoctor")]
        public DetailedDoctor UpdateDoctor([FromBody]DetailedDoctor doctor)
        {
            DetailedDoctor detaildoctor = null;

            try
            {
                detaildoctor = _dbcontext.DetailedDoctors.Include("User").Single(u => u.User.Id == doctor.Id);
                if (detaildoctor != null)
                {
                    string imageName = Guid.NewGuid().ToString() + ".jpg";
                    string base64 = doctor.ImagePath;
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

                    detaildoctor.ImagePath = imageName;
                    _dbcontext.Update(detaildoctor);
                    _dbcontext.SaveChanges();

                }


            }
            catch (Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
            }
            return detaildoctor;
        }
    }
}