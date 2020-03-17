using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.DAL.Entities
{
    [Table("tblDetailedDoctors")]
    public class DetailedDoctor
    {

        [Key, ForeignKey("User")]
        public int Id { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string UserName { get; set; }
        [StringLength(50, MinimumLength = 2)]
        public string UserSurname { get; set; }
        public DateTime DateOfBirth { get; set; }
        [StringLength(50, MinimumLength = 3)]
        public string Locality { get; set; }
        [Range(1, 50)]
        public int WorkExpirience { get; set; }
        [StringLength(50)]
        public string DoctorSpecialty { get; set; }
        public DbUser User { get; set; }
        public string ImagePath { get; set; }
        public  ICollection<MedicalSession> Sessions { get; set; }

    }
}
