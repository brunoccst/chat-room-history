import EventType from "./EventType";

type ChatLog = {
    userName: string;
    eventType: EventType;
    timestamp: Date;
    data?: string;
}

export default ChatLog;