using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace MedicalAssistant.DAL.Entities
{
    [Table("tblMedicalSessions")]
    public class MedicalSession
    {
        [Key]
        public int ID { get; set; }
        public int DetailedDoctorId { get; set; }
        public int DetailedPatientId { get; set; }
        public int RecipeId { get; set;}
        public DateTime Date { get; set; }

        public DetailedDoctor DetailedDoctor { get; set;}
        public DetailedPatient DetailedPatient { get; set;}
        public Recipe Recipe { get; set;}

    }
}
