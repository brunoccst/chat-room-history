using DataAccess.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Entities
{
    public class ChatEntryEventTypeGroup
    {
        public EventType EventType { get; set; }
        public List<ChatEvent> Events { get; set; }
    }
}
