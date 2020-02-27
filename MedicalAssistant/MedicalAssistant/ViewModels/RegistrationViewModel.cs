using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.ViewModels
{
    public class RegistrationViewModel
    {
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Locality { get; set; }
        public int WorkExpirience { get; set; }
        public string DoctorSpecialty { get; set; }
        public string ImagePath { get; set; }

    }
}
