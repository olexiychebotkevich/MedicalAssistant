using MedicalAssistant.DAL.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.DAL
{
    public static class SeederDB
    {
      


        public static void SeedData(IServiceProvider services, IHostingEnvironment env, IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<DbUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<DbRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFDbContext>();
                SeederDB.SeedUsers(manager, managerRole,context);
               
            }
        }


        public static void SeedUsers(UserManager<DbUser> userManager,
            RoleManager<DbRole> roleManager,EFDbContext dbContext)
        {
            var count = roleManager.Roles.Count();
            var roleName = "Admin";
            string[] roleNames = { "Admin", "Doctor", "Patient" };
            foreach (var role_name in roleNames)
            {
                if (roleManager.FindByNameAsync(role_name).Result == null)
                {
                    var result = roleManager.CreateAsync(new DbRole
                    {
                        Name = role_name
                    }).Result;
                }
            }

            if (userManager.FindByEmailAsync("admin@gmail.com").Result == null)
            {
                string email = "admin@gmail.com";
                var user = new DbUser
                {
                    Email = email,
                    UserName = email,
                    PhoneNumber = "+11(111)111-11-11"
                };
                var result = userManager.CreateAsync(user, "8Ki9x9444+s").Result;
                result = userManager.AddToRoleAsync(user, roleName).Result;
                DetailedPatient pat = new DetailedPatient
                {
                    User = user,
                    UserName = "test"
                };
                dbContext.DetailedUsers.Add(pat);

            }


        }
    }
}