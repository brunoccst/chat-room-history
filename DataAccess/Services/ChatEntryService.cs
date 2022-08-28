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
        private Dictionary<TimeInterval, TimeSpan> TimeIntervalLoadDict { get; set; }

        public ChatEntryService(List<ChatEvent> chatEvents)
        {
            this.chatEvents = chatEvents;

            // Set each method to its respective time interval.
            TimeIntervalLoadDict = new Dictionary<TimeInterval, TimeSpan>
            {
                { TimeInterval.MinuteByMinute, new TimeSpan(0, 0, 0) },
                { TimeInterval.Hourly, new TimeSpan(1, 0, 0) }
            };
        }

        public List<ChatEntry> GetChatEntries(TimeInterval timeInterval)
        {
            return GetChatEntriesByInterval(TimeIntervalLoadDict[timeInterval]);
        }

        /// <summary>
        /// Get the chat entries by an interval
        /// </summary>
        /// <param name="interval">Interval</param>
        /// <returns>Chat entries within the interval</returns>
        private List<ChatEntry> GetChatEntriesByInterval(TimeSpan interval)
        {
            // Check if no interval was set, to avoid division by zero afterwards.
            bool isZero = interval.Ticks == 0;

            var grouped = from dt in chatEvents
                          group dt by (isZero) // If no interval was set...
                            ? dt.Timestamp.Ticks // ...then simply group by each own specific timestamp
                            : dt.Timestamp.Ticks / interval.Ticks // ...else, group all the events which their timestamp is within the defined interval
                          into g
                          select new ChatEntry
                          {
                              Timestamp = (isZero) // If no interval was set...
                                  ? g.First().Timestamp // ...the group will only have one item, so use the first timestamp as value
                                  : new DateTime(g.Key * interval.Ticks), // ...else, use the group key timestamp (multiplying by the interval to return to the correct date time)
                              Informations = g.Select(i => i.ToString()).ToList()
                          };

            return grouped.ToList();
        }
    }
}
