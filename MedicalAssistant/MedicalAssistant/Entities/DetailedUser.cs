using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.Entities
{
    public class DetailedUser
    {
        [Key]
        public int Id { get; set; }

        public string UserSurname { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Locality { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }

        public DbUser User { get; set; }
    }
}
