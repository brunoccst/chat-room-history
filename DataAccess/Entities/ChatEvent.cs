using DataAccess.Enums;

namespace DataAccess.Entities
{
    public class ChatEvent
    {
        public string UserName { get; set; }
        public EventType EventType { get; set; }
        public DateTime Timestamp { get; set; }
        public string? Data { get; set; }

        public override string ToString()
        {
            switch (EventType)
            {
                case EventType.EnterTheRoom:
                    return string.Format("{0} enters the room", UserName);
                case EventType.Comment:
                    return string.Format("{0} comments: \"{1}\"", UserName, Data);
                case EventType.HighFiveAnotherUser:
                    return string.Format("{0} high-fives {1}", UserName, Data);
                case EventType.LeaveTheRoom:
                    return string.Format("{0} leaves", UserName);
                default:
                    return base.ToString();
            }
        }
    }

}