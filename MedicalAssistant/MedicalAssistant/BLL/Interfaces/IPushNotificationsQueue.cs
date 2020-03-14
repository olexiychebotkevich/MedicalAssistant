using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Lib.Net.Http.WebPush;

namespace MedicalAssistant.BLL.Interfaces
{
    public interface IPushNotificationsQueue
    {
        void Enqueue(PushMessage message);

        Task<PushMessage> DequeueAsync(CancellationToken cancellationToken);
    }
}
