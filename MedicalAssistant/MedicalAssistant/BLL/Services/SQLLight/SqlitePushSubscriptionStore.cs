using Lib.Net.Http.WebPush;
using MedicalAssistant.BLL.Interfaces;
using MedicalAssistant.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MedicalAssistant.BLL.Services
{
    internal class SqlitePushSubscriptionStore : IPushSubscriptionStore
    {
        private readonly EFDbContext _context;

        public SqlitePushSubscriptionStore(EFDbContext context)
        {
            _context = context;
        }

        public Task StoreSubscriptionAsync(PushSubscription subscription)
        {
            _context.Subscriptions.Add(new EFDbContext.PushSubscription(subscription));

            return _context.SaveChangesAsync();
        }

        public async Task DiscardSubscriptionAsync(string endpoint)
        {
            EFDbContext.PushSubscription subscription = await _context.Subscriptions.FindAsync(endpoint);

            _context.Subscriptions.Remove(subscription);

            await _context.SaveChangesAsync();
        }

        public Task ForEachSubscriptionAsync(Action<PushSubscription> action)
        {
            return ForEachSubscriptionAsync(action, CancellationToken.None);
        }

        public Task ForEachSubscriptionAsync(Action<PushSubscription> action, CancellationToken cancellationToken)
        {
            return _context.Subscriptions.AsNoTracking().ForEachAsync(action, cancellationToken);
        }
    }
}
