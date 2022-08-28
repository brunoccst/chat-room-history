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
                { TimeInterval.MinuteByMinute, new TimeSpan(0, 1, 0) },
                { TimeInterval.Hourly, new TimeSpan(1, 0, 0) }
            };
        }

        public List<ChatEntryTimestampGroup> GetChatEntries(TimeInterval timeInterval)
        {
            return GetChatEntriesByInterval(TimeIntervalLoadDict[timeInterval]);
        }

        /// <summary>
        /// Get the chat entries by an interval
        /// </summary>
        /// <param name="interval">Interval</param>
        /// <returns>Chat entries within the interval</returns>
        private List<ChatEntryTimestampGroup> GetChatEntriesByInterval(TimeSpan interval)
        {
            // If no interval was set, parse each ChatEvent into a ChatEntry,
            // where the ChatEntry's informations list only contains one item - the ChatEvent itself.
            if (interval.Ticks == 0)
            {
                return chatEvents
                    .Select(ce => new ChatEntryTimestampGroup
                    {
                        Timestamp = ce.Timestamp,
                        EventTypeChatEntryGroups = new List<ChatEntryEventTypeGroup> {
                            new ChatEntryEventTypeGroup{
                                EventType = ce.EventType,
                                Events = new List<ChatEvent> { ce }
                            }
                        }
                    })
                    .OrderBy(ce => ce.Timestamp)
                    .ToList();
            }
            // Else, return each ChatEntry with the respective ChatEvents
            // where their timestamp is within the specified interval
            else
            {
                return chatEvents
                    .GroupBy(ce => ce.Timestamp.Ticks / interval.Ticks)
                    .Select(cetg => new ChatEntryTimestampGroup
                    {
                        Timestamp = new DateTime(cetg.Key * interval.Ticks),
                        EventTypeChatEntryGroups = cetg
                            .GroupBy(ce => ce.EventType)
                            .Select(ceetg => new ChatEntryEventTypeGroup
                                {
                                    EventType = ceetg.Key,
                                    Events = ceetg.Select(ce => ce)
                                        .OrderBy(ce => ce.Timestamp)
                                        .ToList()
                                }
                            )
                            .ToList()
                    })
                    .OrderBy(cetg => cetg.Timestamp)
                    .ToList();
            }

            //var grouped = from dt in chatEvents
            //              group dt by (isZero) // If no interval was set...
            //                ? dt.Timestamp.Ticks // ...then simply group by each own specific timestamp
            //                : dt.Timestamp.Ticks / interval.Ticks // ...else, group all the events which their timestamp is within the defined interval
            //              into g
            //              select new ChatEntry
            //              {
            //                  Timestamp = (isZero) // If no interval was set...
            //                      ? g.First().Timestamp // ...the group will only have one item, so use the first timestamp as value
            //                      : new DateTime(g.Key * interval.Ticks), // ...else, use the group key timestamp (multiplying by the interval to return to the correct date time)
            //                  Events = (isZero)
            //                      ? g.Select(i => i.ToString()).ToList()
            //                      : g.GroupBy(i => i.ToString()).ToList()
            //              };

            //return grouped.ToList();
        }
    }
}
