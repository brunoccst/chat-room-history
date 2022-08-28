using DataAccess.Entities;
using DataAccess.Enums;

namespace DataAccess.Interfaces
{
    public interface IChatEntryService
    {
        List<ChatEntryTimestampGroup> GetChatEntries(TimeInterval timeInterval);
    }
}
