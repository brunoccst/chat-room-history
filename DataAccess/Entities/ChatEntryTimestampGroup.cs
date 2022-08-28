﻿using DataAccess.Entities;
using DataAccess.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Entities
{
    public class ChatEntryTimestampGroup
    {
        public DateTime Timestamp { get; set; }
        public List<ChatEntryEventTypeGroup> EventTypeChatEntryGroups { get; set; }
    }
}
