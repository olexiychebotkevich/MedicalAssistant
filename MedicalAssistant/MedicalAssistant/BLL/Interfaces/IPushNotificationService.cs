using Lib.Net.Http.WebPush;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MedicalAssistant.BLL.Services
{


    public interface IPushNotificationService
    {
        string PublicKey { get; }

        Task SendNotificationAsync(PushSubscription subscription, PushMessage message);

        Task SendNotificationAsync(PushSubscription subscription, PushMessage message, CancellationToken cancellationToken);
    }
}
