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
               
                Recipe recipe = new Recipe
                {
                    Diagnos = rec.Diagnos,
                    Tablets = rec.Medicines,
                    Doctor = _dbcontext.DetailedDoctors.Single(d=>d.Id==rec.DoctorID),
                    Patient=_dbcontext.DetailedUsers.Single(p=>p.Id==rec.PatientID),
                    Date=rec.Date
                };
                _dbcontext.Recipes.Add(recipe);
                _dbcontext.SaveChanges();
                return recipe;
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
        [HttpPost("GetDoctorRecipies")]
        public IEnumerable<Recipe> GetPatient([FromBody]UserViewModel user)
        {
                List<Recipe> recipes = new List<Recipe>();
                foreach(Recipe recipe in _dbcontext.Recipes)
                {
                   if(recipe.Doctor.Id==user.Id)
                    {
                        recipes.Add(recipe);
                    }
                }
                return recipes;
        
        }



    }
}