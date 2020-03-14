using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using Lib.Net.Http.WebPush;
using System.Threading;
using System.Diagnostics;
using MedicalAssistant.BLL.Interfaces;
using Microsoft.Extensions.Logging;
using Lib.Net.Http.WebPush.Authentication;

namespace MedicalAssistant.BLL.Services
{
    internal class PushServicePushNotificationService : IPushNotificationService
    {
        private readonly PushNotificationServiceOptions _options;
        private readonly PushServiceClient _pushClient;

        private readonly ILogger _logger;

        public string PublicKey { get { return _options.PublicKey; } }

        public PushServicePushNotificationService(IOptions<PushNotificationServiceOptions> optionsAccessor, IVapidTokenCache vapidTokenCache, PushServiceClient pushClient, ILogger<PushServicePushNotificationService> logger)
        {
            _options = optionsAccessor.Value;

            _pushClient = pushClient;
            _pushClient.DefaultAuthentication = new VapidAuthentication(_options.PublicKey, _options.PrivateKey)
            {
                Subject = _options.Subject,
                TokenCache = vapidTokenCache
            };

            _logger = logger;
        }

        public Task SendNotificationAsync(PushSubscription subscription, PushMessage message)
        {
            return SendNotificationAsync(subscription, message, CancellationToken.None);
        }

        public async Task SendNotificationAsync(PushSubscription subscription, PushMessage message, CancellationToken cancellationToken)
        {
            try
            {
                await _pushClient.RequestPushMessageDeliveryAsync(subscription, message, cancellationToken);
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, "Failed requesting push message delivery to {0}.", subscription.Endpoint);
            }
        }
    }
}
