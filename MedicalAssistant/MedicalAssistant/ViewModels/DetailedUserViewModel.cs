using MedicalAssistant.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.ViewModels
{
    public class DetailedUserViewModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Locality { get; set; }
        public DbUser User { get; set; }
        public string ImagePath { get; set; }
        public List<Recipe> recipes { get; set; }
    } 
}
