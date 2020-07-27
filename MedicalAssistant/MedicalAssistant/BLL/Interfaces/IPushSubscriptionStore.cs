using Lib.Net.Http.WebPush;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MedicalAssistant.BLL.Interfaces
{
    public interface IPushSubscriptionStore
    {
        Task StoreSubscriptionAsync(PushSubscription subscription);

        Task DiscardSubscriptionAsync(string endpoint);

        Task ForEachSubscriptionAsync(Action<PushSubscription> action);

        Task ForEachSubscriptionAsync(Action<PushSubscription> action, CancellationToken cancellationToken);
    }
}
