using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using API;
using DataAccess.Entities;
using DataAccess.Interfaces;
using DataAccess.Services;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Hosting;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Newtonsoft.Json;
using System.Reflection;
using System.Threading.Tasks;

[assembly: WebJobsStartup(typeof(Startup))]
namespace API
{
    public class Startup : IWebJobsStartup
    {
        public async Task<string> GetChatLogTextFromFileAsync() {
            var assembly = this.GetType().GetTypeInfo().Assembly;

            var resourceStream = assembly.GetManifestResourceStream("API.data.chatLog.json");
            
            using var reader = new StreamReader(resourceStream, Encoding.UTF8);
            return await reader.ReadToEndAsync();
        }

        public void Configure(IWebJobsBuilder builder)
        {
            builder.Services.TryAddScoped(s =>
                {
                    string jsonText = GetChatLogTextFromFileAsync().Result;
                    return JsonConvert.DeserializeObject<List<ChatLog>>(jsonText);
                }
            );
            builder.Services.TryAddScoped<IChatLogService, ChatLogService>();
        }
    }
}
