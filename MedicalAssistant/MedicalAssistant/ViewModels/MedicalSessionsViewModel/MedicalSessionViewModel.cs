using MedicalAssistant.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.ViewModels
{
    public class MedicalSessionViewModel
    {
        public DateTime Date { get; set; }
        public string DoctorName  { get; set; }
        public string DoctorSurname { get; set; }
        public string DoctorSpeciality { get; set; }
        public string PatientName { get; set; }
        public string PatientSurname { get; set; }
        public string DoctorPhone { get; set; }
        public string PatientPhone { get; set; }
        public Recipe Recipe { get; set; }
    }
}
