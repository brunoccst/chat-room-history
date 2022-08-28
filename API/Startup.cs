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
        public async Task<string> GetChatEntryTextFromFileAsync() {
            var assembly = this.GetType().GetTypeInfo().Assembly;

            var resourceStream = assembly.GetManifestResourceStream("API.data.chatEvents.json");
            
            using var reader = new StreamReader(resourceStream, Encoding.UTF8);
            return await reader.ReadToEndAsync();
        }

        public void Configure(IWebJobsBuilder builder)
        {
            builder.Services.TryAddScoped(s =>
                {
                    string jsonText = GetChatEntryTextFromFileAsync().Result;
                    return JsonConvert.DeserializeObject<List<ChatEvent>>(jsonText);
                }
            );
            builder.Services.TryAddScoped<IChatEntryService, ChatEntryService>();
        }
    }
}
