import { EventType } from "types";

type ChatEvent = {
    userName: string;
    eventType: EventType;
    timestamp: string;
    data?: string
}

export default ChatEvent;