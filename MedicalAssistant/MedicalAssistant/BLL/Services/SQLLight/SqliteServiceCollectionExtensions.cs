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

        private const string SQLITE_CONNECTION_STRING_NAME = "User ID=postgres;Password=jony3o8oKle@3e2Sda-9&s;Server=91.238.103.49;Port=5432;Database=MedicalAssistant;";

        public static IServiceCollection AddSqlitePushSubscriptionStore(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<EFDbContext>(options =>
               options.UseNpgsql(SQLITE_CONNECTION_STRING_NAME));

            services.AddTransient<IPushSubscriptionStore, SqlitePushSubscriptionStore>();

            return services;
        }
    }
}
