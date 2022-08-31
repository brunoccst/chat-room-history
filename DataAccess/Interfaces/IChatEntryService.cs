﻿using DataAccess.Entities;
using DataAccess.Enums;

namespace DataAccess.Interfaces
{
    public interface IChatEntryService
    {
        /// <summary>
        /// Get the chat entries by an interval, grouping them by <see cref="ChatEvent.Timestamp"/> and <see cref="ChatEvent.EventType"/>
        /// </summary>
        /// <param name="timeInterval">Interval</param>
        /// <returns>Chat entries within the interval</returns>
        List<ChatEntryGroup> GetChatEntries(TimeInterval timeInterval);
    }
}
