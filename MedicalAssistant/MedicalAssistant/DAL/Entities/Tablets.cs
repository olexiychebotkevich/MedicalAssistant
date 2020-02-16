using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.DAL.Entities
{
    public class Tablets
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set;}
        public int Countdays { get; set; }
        public string Receptionfeatures { get; set; }
        public int Counttimesaday { get; set; }
    }
}
