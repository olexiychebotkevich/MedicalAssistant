﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.ViewModels
{
    public class DoctorPatiantViewModel
    {
        public int PatientID { get; set; }
        public string PatientName { get; set; }
        public string PatientSurname { get; set; }
    }


    public class DoctorPatiantComparer : IEqualityComparer<DoctorPatiantViewModel>
    {
        public bool Equals(DoctorPatiantViewModel x, DoctorPatiantViewModel y)
        {
            if (x.PatientID == y.PatientID)
            {
                return true;
            }
            return false;
        }

        public int GetHashCode(DoctorPatiantViewModel obj)
        {
            return obj.PatientID.GetHashCode();
        }
    }
}
