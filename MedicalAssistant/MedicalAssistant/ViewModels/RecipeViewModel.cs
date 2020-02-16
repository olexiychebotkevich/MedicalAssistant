using MedicalAssistant.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.ViewModels
{
    public class RecipeViewModel
    {
        public int PatientID { get; set; }
        public string Diagnos { get; set; }
        public List<Tablets> Medicines { get; set; }
    }
}
