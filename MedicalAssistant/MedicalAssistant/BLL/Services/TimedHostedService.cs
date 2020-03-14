using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MedicalAssistant.BLL.Services
{
    internal class TimedHostedService : IHostedService, IDisposable
    {
        private Timer _timer;
        public TimedHostedService()
        {
            Console.WriteLine("TimedHostedService ctor");
        }


        public Task StartAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine("Timed Background Service is starting.");

            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromSeconds(30));

            return Task.CompletedTask;
        }


        private void DoWork(object state)
        {
            Debug.WriteLine("Timed Background Service is working.");
        }


        public Task StopAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine("Timed Background Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }




    }
}
