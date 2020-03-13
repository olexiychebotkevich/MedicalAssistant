using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.DAL.Entities
{
    [Table("tblDetailedPatients")]
    public class DetailedPatient
    {
        [Key, ForeignKey("User")]
        public int Id { get; set; }
        [StringLength(50, MinimumLength = 4)]
        public string UserName { get; set; }
        [StringLength(50, MinimumLength = 2)]
        public string UserSurname { get; set; }
        public DateTime DateOfBirth { get; set; }
        [StringLength(50, MinimumLength = 2)]
        public string Locality { get; set; }
        public DbUser User { get; set; }
        public string ImagePath { get; set; }
        

    }
}
