import { ChatEntry, EventType } from "types";

type EventTypeChatEntryGroup = {
    eventType: EventType;
    events: ChatEntry[]
}

export default EventTypeChatEntryGroup;