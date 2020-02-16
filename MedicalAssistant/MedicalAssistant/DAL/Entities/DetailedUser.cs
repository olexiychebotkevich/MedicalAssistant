using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.DAL.Entities
{
    [Table("tblDetailedUsers")]
    public class DetailedUser
    {
        [Key, ForeignKey("User")]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Locality { get; set; }
        public DbUser User { get; set; }
        public string ImagePath { get; set; }
        

    }
}
