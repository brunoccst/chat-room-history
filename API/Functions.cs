using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using DataAccess.Entities;
using DataAccess.Interfaces;

namespace API
{
    public class Functions
    {
        private IChatLogService chatLogService { get; set; }

        public Functions(IChatLogService chatLogService)
        {
            this.chatLogService = chatLogService;
        }

        [FunctionName("GetChatLogs")]
        public async Task<IActionResult> GetChatLogs(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            //string name = req.Query["name"];

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //dynamic data = JsonConvert.DeserializeObject(requestBody);
            //name = name ?? data?.name;

            var chatLogs = await Task.Run(this.chatLogService.GetChatLogs);

            return new OkObjectResult(chatLogs);
        }
    }
}
