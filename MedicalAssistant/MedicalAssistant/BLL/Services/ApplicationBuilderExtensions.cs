using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.BLL.Services
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UsePushSubscriptionStore(this IApplicationBuilder app)
        {
            app.UseSqlitePushSubscriptionStore();

            return app;
        }
    }
}
