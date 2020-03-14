using MedicalAssistant.DAL.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.BLL.Services
{
    public static class SqliteApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseSqlitePushSubscriptionStore(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                EFDbContext context = serviceScope.ServiceProvider.GetService<EFDbContext>();
                context.Database.EnsureCreated();
            }

            return app;
        }
    }
}
