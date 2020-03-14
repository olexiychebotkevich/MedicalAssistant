using MedicalAssistant.BLL.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.BLL.Services
{
    public static class ServiceCollectionExtensions
    {
        private const string PUSH_NOTIFICATION_SERVICE_CONFIGURATION_SECTION = "PushNotificationService";

        public static IServiceCollection AddPushSubscriptionStore(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSqlitePushSubscriptionStore(configuration);

            return services;
        }

        public static IServiceCollection AddPushNotificationService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions();
            services.Configure<PushNotificationServiceOptions>(configuration.GetSection(PUSH_NOTIFICATION_SERVICE_CONFIGURATION_SECTION));

            services.AddPushServicePushNotificationService();

            return services;
        }

        public static IServiceCollection AddPushNotificationsQueue(this IServiceCollection services)
        {
            services.AddSingleton<IPushNotificationsQueue, PushNotificationsQueue>();
            services.AddSingleton<IHostedService, PushNotificationsDequeuer>();

            return services;
        }
    }
}
