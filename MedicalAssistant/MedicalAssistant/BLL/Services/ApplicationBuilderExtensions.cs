using MedicalAssistant.BLL.Services.Sqlite;
using Microsoft.AspNetCore.Builder;

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
