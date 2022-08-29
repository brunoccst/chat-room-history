using DataAccess.Entities;
using DataAccess.Enums;

namespace DataAccess.Interfaces
{
    public interface IChatEntryService
    {
        /// <summary>
        /// Get the chat entries by an interval, grouping them first by <see cref="ChatEvent.EventType"/> then by <see cref="ChatEvent.Timestamp"/>
        /// </summary>
        /// <param name="timeInterval">Interval</param>
        /// <returns>Chat entries within the interval</returns>
        List<ChatEntryTimestampGroup> GetChatEntries(TimeInterval timeInterval);
    }
}
