using MedicalAssistant.BLL.Interfaces;
using MedicalAssistant.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.BLL.Services
{
    public static class SqliteServiceCollectionExtensions
    {
        private const string SQLITE_CONNECTION_STRING_NAME = "MedicalAssistantDB.sqlite";

        public static IServiceCollection AddSqlitePushSubscriptionStore(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<EFDbContext>(options =>
                options.UseSqlite(configuration.GetConnectionString(SQLITE_CONNECTION_STRING_NAME))
            );

            services.AddTransient<IPushSubscriptionStore, SqlitePushSubscriptionStore>();

            return services;
        }
    }
}
