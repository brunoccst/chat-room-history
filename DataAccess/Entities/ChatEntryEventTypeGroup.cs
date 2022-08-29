using DataAccess.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Entities
{
    /// <summary>
    /// Represents a list of <see cref="ChatEvent"/> grouped by the <see cref="ChatEvent.EventType"/>
    /// </summary>
    public class ChatEntryEventTypeGroup
    {
        public EventType EventType { get; set; }
        public List<ChatEvent> Events { get; set; }
    }
}
