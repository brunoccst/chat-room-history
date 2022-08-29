import { EventTypeChatEntryGroup } from "types";

type TimestampChatEntryGroup = {
    timestamp: string;
    eventTypeChatEntryGroups: EventTypeChatEntryGroup[]
}

export default TimestampChatEntryGroup;