import { EventType } from "types";

type ChatEntry = {
    userName: string;
    eventType: EventType;
    timestamp: string;
    data?: string
}

export default ChatEntry;