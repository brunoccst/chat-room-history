import EventType from "./EventType";

type ChatEntry = {
    userName: string;
    eventType: EventType;
    timestamp: string;
    data?: string
}

export default ChatEntry;