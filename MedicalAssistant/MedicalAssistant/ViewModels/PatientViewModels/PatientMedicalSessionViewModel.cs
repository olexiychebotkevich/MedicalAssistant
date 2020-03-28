using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.ViewModels
{
    public class PatientMedicalSessionViewModel
    {
        public int SessionId { get; set; }
        public DateTime Date { get; set; }
        public string DoctorName { get; set; }
        public string DoctorSurname { get; set; }
        public string DoctorSpecialty { get; set; }
        public string Diagnos { get; set; }
    }
}
