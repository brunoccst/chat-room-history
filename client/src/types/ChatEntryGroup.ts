import { EventType } from "types";

type ChatEntryGroup = {
    userName: string;
    eventType: EventType;
    timestamp: string;
    data?: string
}

export default ChatEntryGroup;