﻿using Microsoft.AspNetCore.Identity;

namespace MedicalAssistant.Entities
{
    public class DbUserRole : IdentityUserRole<int>
    {
        public virtual DbUser User { get; set; }
        public virtual DbRole Role { get; set; }
    }
}