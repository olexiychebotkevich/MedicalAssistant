using MedicalAssistant.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.ViewModels.DoctorViewModels
{
    public class AddMedicalSessionViewModel
    {
        public int DoctorID { get; set; }
        public int PatientID { get; set; }
        public DateTime Date { get; set; }
        public string Diagnos { get; set; }
        public ICollection<Medicine> Tablets { get; set; }

    }
}
