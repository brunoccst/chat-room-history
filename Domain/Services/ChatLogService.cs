using DataAccess.Entities;
using DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Services
{
    public class ChatLogService : IChatLogService
    {
        private List<ChatLog> chatLogs { get; set; }

        public ChatLogService(List<ChatLog> chatLogs)
        {
            this.chatLogs = chatLogs;
        }

        public List<ChatLog> GetChatLogs()
        {
            return chatLogs;
        }
    }
}
