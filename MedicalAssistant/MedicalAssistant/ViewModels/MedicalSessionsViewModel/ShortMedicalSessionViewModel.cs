using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.ViewModels.MedicalSessionsViewModel
{
    public class ShortMedicalSessionViewModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Diagnos { get; set; }
        public string DoctorName { get; set; }
        public string DoctorSurname { get; set; }
        public string DoctorSpeciality { get; set; }
        public string PatientName { get; set; }
        public string PatientSurname { get; set; }
    }
}
