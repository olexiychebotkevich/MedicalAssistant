using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalAssistant.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
        public DetailedUser GetUser(int id)
        {
            DetailedUser user = null;
            try
            {
                user = _dbcontext.DetailedUsers.Single(u => u.Id == id);
            }
            catch (Exception e)
            {
                Console.WriteLine("{0} Exception caught.", e);
            }
            return user;

        }
    }
}