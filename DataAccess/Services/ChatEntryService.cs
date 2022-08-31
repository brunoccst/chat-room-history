﻿using DataAccess.Entities;
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
            var ticks = interval.Ticks == 0
                ? 1
                : interval.Ticks;

            return chatEvents
                .GroupBy(chatEvent => chatEvent.Timestamp.Ticks / ticks)
                .Select(timestampGroup =>
                    new ChatEntryTimestampGroup
                    {
                        Timestamp = new DateTime(timestampGroup.Key * ticks),
                        EventTypeChatEntryGroups =
                                timestampGroup
                                .GroupBy(ce => ce.EventType)
                                .Select(eventTypeGroup =>
                                    new ChatEntryEventTypeGroup
                                    {
                                        EventType = eventTypeGroup.Key,
                                        Events = eventTypeGroup.Select(ce => ce)
                                                        .OrderBy(ce => ce.Timestamp)
                                                        .ToList()
                                    })
                                .OrderBy(ce => ce.EventType)
                                .ToList()
                    })
                .OrderBy(cetg => cetg.Timestamp)
                .ToList();
        }
    }
}
