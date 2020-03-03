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
                DetailedUser detailuser = _dbcontext.DetailedUsers.Include("User").SingleOrDefault(u => u.User.Id == id);
                if (detailuser == null)
                {
                    return NotFound();
                }

                DetailedUserViewModel detailedUserViewModel = new DetailedUserViewModel
                {
                    Id = detailuser.Id,
                    UserName =  detailuser.UserName,
                    UserSurname = detailuser.UserSurname,
                    DateOfBirth = detailuser.DateOfBirth,
                    User=detailuser.User,
                    Locality = detailuser.Locality,
                    ImagePath = $"Images/{detailuser.ImagePath}",
                    recipes = _dbcontext.Recipes.Include(r => r.Patient).Include(r=>r.Doctor).Where(r => r.Patient.Id == detailuser.Id).ToList()

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
        public IActionResult GetDoctor([FromQuery] int ? id)
        {

            try
            {
                DetailedDoctor detaildoctor = _dbcontext.DetailedDoctors.Include("User").SingleOrDefault(u => u.User.Id == id);

                if (detaildoctor == null)
                {
                    return NotFound();
                }

                DetailedDoctorViewModel detailedDoctorViewModel = new DetailedDoctorViewModel
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
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody]DetailedUser user)
        {
            if (user == null)
            {
                return NotFound();
            }

            var userToUpdate = await _dbcontext.DetailedUsers.Include("User").SingleOrDefaultAsync(u => u.User.Id == user.Id);

            //try
            //{
                //var AddImageResultTask = Task.Run(() => AddImage(user.ImagePath));
                string imageName = AddImage(user.ImagePath);
                //string imageName = await AddImageResultTask;
               
                userToUpdate.ImagePath = imageName;
                    if(await TryUpdateModelAsync<DetailedUser>(userToUpdate, "", s => s.ImagePath))
                    {
                    try
                    {
                        await _dbcontext.SaveChangesAsync();
                        return Ok(userToUpdate);
                    }
                    catch (DbUpdateException ex )
                    {
                        Debug.WriteLine("{0} Exception caught.", ex);
                        ModelState.AddModelError("", "Unable to save changes. " +
                            "Try again, and if the problem persists, " +
                            "see your system administrator.");
                    }

                }
                   

           // }
            //catch (Exception e)
            //{
            //    Debug.WriteLine("{0} Exception caught.", e);
            //    return BadRequest();
              
            //}
            return Ok(userToUpdate);

        }



        [Authorize]
        [HttpPut("UpdateDoctor")]
        public async Task<IActionResult> UpdateDoctor([FromBody]DetailedDoctor doctor)
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
                        catch (DbUpdateException  ex)
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
            Debug.WriteLine("1----");
            string imageName = Guid.NewGuid().ToString() + ".jpg";
            Debug.WriteLine("2----");
            string base64 = ImagePath;
            if (base64.Contains(","))
            {
                base64 = base64.Split(',')[1];
            }
            Debug.WriteLine("3----");
            var bmp = base64.FromBase64StringToImage();
            Debug.WriteLine("4----");
            string fileDestDir = _env.ContentRootPath;
            Debug.WriteLine("5----");
            fileDestDir = Path.Combine(fileDestDir, _configuration.GetValue<string>("ImagesPath"));
            Debug.WriteLine("6----");

            string fileSave = Path.Combine(fileDestDir, imageName);
            Debug.WriteLine("7----");
            if (bmp != null)
            {
                int size = 1000;
                var image = ImageHelper.CompressImage(bmp, size, size);
                image.Save(fileSave, ImageFormat.Jpeg);
            }
            Debug.WriteLine("8----");


            return imageName;
        }
    }
}