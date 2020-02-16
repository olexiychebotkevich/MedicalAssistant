using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using MedicalAssistant.DAL.Entities;
using MedicalAssistant.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicalAssistant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {


      
        private readonly EFDbContext _dbcontext;
       
        public RecipeController( EFDbContext context)
        {
        
            _dbcontext = context;
         
        }

        [Authorize]
        [HttpPost("AddRecipe")]
        public object AddRecipe([FromBody]RecipeViewModel rec)
        {

            try
            {
                DetailedUser detailuser = _dbcontext.DetailedUsers.Single(u => u.User.Id == rec.PatientID);
                Recipe recipe = new Recipe { Diagnos = rec.Diagnos, Tablets = rec.Medicines };
                Debug.WriteLine("{0} Recipies",recipe);
                detailuser.Recipies.Add(recipe);
                _dbcontext.Entry(detailuser).State = EntityState.Modified;
                _dbcontext.SaveChanges();
                return detailuser;
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


      
    }
}