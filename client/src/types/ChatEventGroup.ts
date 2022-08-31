import { EventType, ChatEvent } from "types";

type ChatEventGroup = {
    eventType: EventType;
    timestamp: string;
    chatEvents: ChatEvent[];
}

export default ChatEventGroup;