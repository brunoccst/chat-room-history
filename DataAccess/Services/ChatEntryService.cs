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
        private List<ChatEvent> chatEvents { get; set; }

        /// <summary>
        /// A dictionary to store a specific time span for each respective time interval type.
        /// </summary>
        private Dictionary<TimeInterval, TimeSpan> TimeIntervalLoadDict { get; set; }

        public ChatEntryService(List<ChatEvent> chatEvents)
        {
            this.chatEvents = chatEvents;
            
            TimeIntervalLoadDict = new Dictionary<TimeInterval, TimeSpan>
            {
                { TimeInterval.MinuteByMinute, new TimeSpan(0, 1, 0) },
                { TimeInterval.Hourly, new TimeSpan(1, 0, 0) }
            };
        }

        public List<ChatEntryTimestampGroup> GetChatEntries(TimeInterval timeInterval)
        {
            var interval = TimeIntervalLoadDict[timeInterval];

            // Select each ChatEvent, grouping them by EventType first, then by Timestamp.
            // If no interval was set (Ticks = 0), simply map each ChatEvent into the group structure
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
            // Else, group them as normally.
            // The first group is the timestamp. To make it, it's necessary to divide the ChatEvent timestamp ticks by the requested interval ticks.
            // E.g.: 17h00 in ticks = 612000000000 (some ChatEvent timestamp)
            //       17h30 in ticks = 630000000000 (another ChatEvent timestamp)
            //       18h00 in ticks = 648000000000 (another ChatEvent timestamp)
            //       01h00 in ticks = 36000000000 (interval to group by - "Hourly")
            //       Dividing the ticks of each ChatEvent timestamps by the interval ticks will result in 17 for the first two timestamps and 18 for the second - the 17h and 18h groups, respectively
            // The second group is made by the event type. It's a simple "group by" that uses each distinc event type.
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
                            .OrderBy(ce => ce.EventType)
                            .ToList()
                    })
                    .OrderBy(cetg => cetg.Timestamp)
                    .ToList();
            }
        }
    }
}
