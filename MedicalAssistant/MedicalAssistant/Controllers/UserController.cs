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
        [HttpPost("GetPatient")]
        public object GetPatient([FromBody]DetailedUser user)
        {
          
            try
            {
                DetailedUser detailuser = _dbcontext.DetailedUsers.Include("User").Single(u=>u.User.Id== user.Id);
                return detailuser;
            }
            catch (ArgumentNullException e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return BadRequest(new { invalid = "Email does not exist" });
            }
            catch(Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
                return BadRequest(new { invalid = "Email does not exist" });
            }

        }


        [Authorize]
        [HttpPost("GetDoctor")]
        public object GetDoctor([FromBody]UserViewModel user)
        {

            try
            {
                DetailedDoctor detaildoctor = _dbcontext.DetailedDoctors.Include("User").Single(u => u.User.Id == user.Id);
                return detaildoctor;
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
    }
}