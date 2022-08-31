using DataAccess.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Entities
{
    public class ChatEntryGroup
    {
        public DateTime Timestamp { get; set; }
        public EventType EventType { get; set; }
        public List<ChatEvent> ChatEvents { get; set; }
    }
}
