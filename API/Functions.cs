using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using DataAccess.Interfaces;
using DataAccess.Enums;

namespace API
{
    public class Functions
    {
        private IChatEventService chatEventService { get; set; }

        public Functions(IChatEventService chatEventService)
        {
            this.chatEventService = chatEventService;
        }

        /// <summary>
        /// Returns a list of chat events groups given the specified time interval, where <see cref="TimeInterval.MinuteByMinute"/> is the default
        /// </summary>
        /// <param name="req">Received HTTP request</param>
        /// <param name="log">Logger service</param>
        /// <returns>List of chat event groups</returns>
        [FunctionName("GetChatEventGroups")]
        public async Task<IActionResult> GetChatEventGroups(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Received a request");

            TimeInterval timeInterval = TimeInterval.MinuteByMinute;
            Enum.TryParse(req.Query["timeInterval"], out timeInterval);

            log.LogInformation("Time interval: " + timeInterval);

            var chatEntries = await Task.Run(() => this.chatEventService.GetChatEventGroups(timeInterval));

            return new OkObjectResult(chatEntries);
        }
    }
}
