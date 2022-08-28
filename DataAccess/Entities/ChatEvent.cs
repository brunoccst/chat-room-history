using DataAccess.Enums;

namespace DataAccess.Entities
{
    public class ChatEvent
    {
        public string UserName { get; set; }
        public EventType EventType { get; set; }
        public DateTime Timestamp { get; set; }
        public string? Data { get; set; }
    }

}