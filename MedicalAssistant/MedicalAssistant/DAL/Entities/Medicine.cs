using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.DAL.Entities
{
    public class Medicine
    {
        [Key]
        public int ID { get; set; }
        [StringLength(100, MinimumLength = 5)]
        public string Name { get; set;}
        [Range(1, 31)]
        public int Countdays { get; set; }
        [StringLength(200)]
        public string Receptionfeatures { get; set; }
        [Range(1, 10)]
        public int Counttimesaday { get; set; }
    }
}
