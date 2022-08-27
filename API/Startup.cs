using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API;
using DataAccess.Entities;
using DataAccess.Interfaces;
using DataAccess.Services;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Hosting;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Newtonsoft.Json;

[assembly: WebJobsStartup(typeof(Startup))]
namespace API
{
    public class Startup : IWebJobsStartup
    {
        public void Configure(IWebJobsBuilder builder)
        {
            builder.Services.TryAddScoped(s =>
                {
                    string jsonText = System.IO.File.ReadAllText("data.json");
                    return JsonConvert.DeserializeObject<List<ChatLog>>(jsonText);
                }
            );
            builder.Services.TryAddScoped<IChatLogService, ChatLogService>();
        }
    }
}
