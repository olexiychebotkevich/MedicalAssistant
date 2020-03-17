using MedicalAssistant.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.ViewModels
{
    public class DoctorMedicalSessionViewModel
    {
        public int SessionId { get; set; }
        public DateTime Date { get; set; }
        public string PatientName { get; set; }
        public string PatientSurname { get; set; }
        public string  Diagnos { get; set; }
    }
}
