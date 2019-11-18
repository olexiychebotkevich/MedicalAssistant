using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.DAL.Entities
{
    public class RefreshToken
    {
        [Key, ForeignKey("User")]
        public int Id { get; set; }
        public string Token { get; set; }
        public DbUser User { get; set; }
    }
}
