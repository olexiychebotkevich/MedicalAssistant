using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using MedicalAssistant.DAL.Entities;
using MedicalAssistant.ViewModels;
using MedicalAssistant.ViewModels.DoctorViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicalAssistant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalSessionsController : ControllerBase
    {

        private readonly EFDbContext _dbcontext;

        public MedicalSessionsController(EFDbContext context)
        {

            _dbcontext = context;

        }

        [Authorize]
        [HttpPost("AddSession")]
        public async Task<IActionResult> AddSession([FromBody]AddMedicalSessionViewModel session)
        {

            try
            {
                MedicalSession medicalsession = new MedicalSession
                {
                    Recipe = new Recipe
                    {
                        Date = session.Date,
                        Diagnos = session.Diagnos,
                        Tablets = session.Tablets
                    },
                    DetailedDoctor = _dbcontext.DetailedDoctors.Single(d => d.Id == session.DoctorID),
                    DetailedPatient = _dbcontext.DetailedUsers.Single(p => p.Id == session.PatientID),
                    Date = session.Date
                };
                _dbcontext.MedicalSessions.Add(medicalsession);
                await _dbcontext.SaveChangesAsync();
                return Ok(medicalsession);
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
        [HttpGet("GetSession")]
        public async Task<IActionResult> GetDetailedSession([FromQuery] int? id)
        {
            try
            {
                MedicalSession medicalsession = await _dbcontext.MedicalSessions
                    .Include("DetailedDoctor.User")
                    .Include("DetailedPatient.User")
                    .Include("Recipe.Tablets")
                    .SingleAsync(s => s.ID == id);

                MedicalSessionViewModel session = new MedicalSessionViewModel
                {
                    Date = medicalsession.Date,
                    DoctorName = medicalsession.DetailedDoctor.UserName,
                    DoctorSurname = medicalsession.DetailedDoctor.UserSurname,
                    DoctorPhone = medicalsession.DetailedDoctor.User.PhoneNumber,
                    DoctorSpeciality=medicalsession.DetailedDoctor.DoctorSpecialty,
                    PatientName = medicalsession.DetailedPatient.UserName,
                    PatientSurname = medicalsession.DetailedPatient.UserSurname,
                    PatientPhone = medicalsession.DetailedPatient.User.PhoneNumber,
                    Recipe = medicalsession.Recipe
                    
                };
                return Ok(session);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.InnerException);
            }
           

        }


    }
}