using DataAccess.Entities;
using DataAccess.Enums;
using DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Services
{
    public class ChatEntryService : IChatEntryService
    {
        /// <summary>
        /// In memory chat events (data source).
        /// </summary>
        private List<ChatEvent> chatEvents { get; set; }

        /// <summary>
        /// A dictionary to store a method for each respective time interval type.
        /// </summary>
        private Dictionary<TimeInterval, Func<List<ChatEntry>>> TimeIntervalLoadDict { get; set; }

        public ChatEntryService(List<ChatEvent> chatEvents)
        {
            this.chatEvents = chatEvents;

            // Set each method to its respective time interval.
            TimeIntervalLoadDict = new Dictionary<TimeInterval, Func<List<ChatEntry>>>
            {
                { TimeInterval.MinuteByMinute, GetMinuteByMinuteChatEntries },
                { TimeInterval.Hourly, GetHourlyChatEntries }
            };
        }

        public List<ChatEntry> GetChatEntries(TimeInterval timeInterval)
        {
            return TimeIntervalLoadDict[timeInterval]();
        }

        private List<ChatEntry> GetMinuteByMinuteChatEntries()
        {
            return chatEvents
                .Select(cl => new ChatEntry()
                {
                    Timestamp = cl.Timestamp,
                    Informations = new List<string> { cl.ToString() }
                })
                .ToList();
        }

        private List<ChatEntry> GetHourlyChatEntries()
        {
            // TODO: Change this
            return chatEvents
                // Group by the current hour by making the minutes and seconds become to zero.
                .GroupBy(ce => ce.Timestamp
                    .AddMinutes(-ce.Timestamp.Minute)
                    .AddMilliseconds(-ce.Timestamp.Millisecond)
                )
                // Then select the strings of each
                .Select(ceg => new ChatEntry()
                {
                    Timestamp = ceg.Key,
                    Informations = ceg.Select(cl => cl.ToString()).ToList()
                })
                .ToList();
        }
    }
}
