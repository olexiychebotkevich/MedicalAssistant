using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalAssistant.BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MedicalAssistant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PushSubscriptionsController : ControllerBase
    {
        private readonly IPushNotificationService _pushSubscriptionsService;

    }
}
