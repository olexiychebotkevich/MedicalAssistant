using MedicalAssistant.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.BLL.Interfaces
{
    public interface IJWTTokenService
    {
        string CreateToken(DbUser user);
        string CreateRefreshToken(DbUser user);
    }
}
