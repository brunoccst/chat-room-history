import ChatEntry from "./ChatEntry";
import EventType from "./EventType";

type EventTypeChatEntryGroup = {
    eventType: EventType;
    events: ChatEntry[]
}

export default EventTypeChatEntryGroup;