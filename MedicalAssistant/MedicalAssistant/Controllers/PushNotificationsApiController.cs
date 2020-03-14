using MedicalAssistant.BLL.Interfaces;
using MedicalAssistant.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.Controllers
{
    public class PushNotificationsApiController : ControllerBase
    {
        private readonly IPushSubscriptionStore _subscriptionStore;

        public PushNotificationsApiController(IPushSubscriptionStore subscriptionStore)
        {
            _subscriptionStore = subscriptionStore;
        }


        [HttpPost("subscriptions")]
        public async Task<IActionResult> StoreSubscription([FromBody]PushSubscription subscription)
        {
            await _subscriptionStore.StoreSubscriptionAsync(subscription);

            return NoContent();
        }
    }
}
