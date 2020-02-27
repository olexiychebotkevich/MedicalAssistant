using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.ViewModels
{
    public class LoginViewModel
    {
        [EmailAddress(ErrorMessage = "Field Email is required")]
        [Required(ErrorMessage = "Field Email can`t be empty")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Field Password can`t be empty")]
        public string Password { get; set; }
    }
}
