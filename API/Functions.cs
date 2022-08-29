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
        private IChatEntryService chatEntryService { get; set; }

        public Functions(IChatEntryService chatEntryService)
        {
            this.chatEntryService = chatEntryService;
        }

        /// <summary>
        /// Returns the chat entries grouped by the specified time interval and the respective event types.
        /// Uses <see cref="TimeInterval.MinuteByMinute"/> if the time interval was not set in the request parameters.
        /// </summary>
        /// <param name="req">Received HTTP request</param>
        /// <param name="log">Logger service</param>
        /// <returns>Grouped chat entries</returns>
        [FunctionName("GetChatEntries")]
        public async Task<IActionResult> GetChatEntries(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Received a request");

            TimeInterval timeInterval = TimeInterval.MinuteByMinute;
            Enum.TryParse(req.Query["timeInterval"], out timeInterval);

            log.LogInformation("Time interval: " + timeInterval);

            var chatEntries = await Task.Run(() => this.chatEntryService.GetChatEntries(timeInterval));

            return new OkObjectResult(chatEntries);
        }
    }
}
