using MedicalAssistant.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalAssistant.BLL.Services
{

    public class PushNotificationServiceOptions
    {
        public string Subject { get; set; }

        public string PublicKey { get; set; }

        public string PrivateKey { get; set; }
    }

    public interface IPushNotificationService
    {
        void SendNotification(PushSubscription subscription, string payload);
    }
}
