using DataAccess.Entities;
using DataAccess.Enums;

namespace DataAccess.Interfaces
{
    public interface IChatEventService
    {
        /// <summary>
        /// Get the chat events grouped by <see cref="ChatEvent.Timestamp"/> (based on the <paramref name="timeInterval"/>) and <see cref="ChatEvent.EventType"/>
        /// </summary>
        /// <param name="timeInterval">Interval</param>
        /// <returns>Chat event groups within the specified time interval</returns>
        List<ChatEventGroup> GetChatEventGroups(TimeInterval timeInterval);
    }
}
