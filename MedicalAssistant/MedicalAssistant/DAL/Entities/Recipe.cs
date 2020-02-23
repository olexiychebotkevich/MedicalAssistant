using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.DAL.Entities
{
    [Table("tblRecipies")]
    public class Recipe
    {
        [Key]
        public int ID { get; set; }
        public string Diagnos { get; set; }
        public IEnumerable<Tablets> Tablets {get;set;}
        public DetailedUser Patient { get; set; }
        public DetailedDoctor Doctor { get; set; }
        public DateTime Date { get; set; }

    }
}
