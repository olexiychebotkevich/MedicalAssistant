using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using MedicalAssistant.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicalAssistant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {


        private readonly UserManager<DbUser> userManager;
        private readonly EFDbContext _dbcontext;
        public UserController(UserManager<DbUser> userManager,EFDbContext context)
        {
            this.userManager = userManager;
            this._dbcontext = context;
        }

        [Authorize]
        [HttpPost("GetUser")]
        public DetailedUser GetUser([FromBody]DetailedUser user)
        {
            DetailedUser detailuser = null;
            try
            {

                detailuser = _dbcontext.DetailedUsers.Include("User").Single(u=>u.User.Id== user.Id);
            }
            catch (Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
            }
            return detailuser;

        }

        [Authorize]
        [HttpPut("UpdateUser")]
        public DetailedUser UpdateUser([FromBody]DetailedUser user)
        {
            DetailedUser detailuser = null;
            try
            {
                detailuser = _dbcontext.DetailedUsers.Include("User").Single(u => u.User.Id == user.Id);
                detailuser.ImagePath = user.ImagePath;
                _dbcontext.Add(detailuser);
                _dbcontext.SaveChanges();
            }
            catch (Exception e)
            {
                Debug.WriteLine("{0} Exception caught.", e);
            }
            return detailuser;
        }
    }
}