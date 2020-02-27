using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace MedicalAssistant.DAL.Entities
{
    public class DbUser : IdentityUser<int>
    {
        public ICollection<DbUserRole> UserRoles { get; set; }

    }
}