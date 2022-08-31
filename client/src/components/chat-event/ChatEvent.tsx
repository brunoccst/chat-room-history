import { ChatEvent as ChatEventType, EventType } from "types";

type ChatEventDescriptionDict = { [eventType: string]: (chatEvent: ChatEventType) => string }

const ChatEventDescription: ChatEventDescriptionDict = {
    [EventType.enterTheRoom]: ({ userName }: ChatEventType) => `${userName} enters the room`,
    [EventType.comment]: ({ userName, data }: ChatEventType) => `${userName} comments: ${data}`,
    [EventType.highFiveAnotherUser]: ({ userName, data }: ChatEventType) => `${userName} high fives ${data}`,
    [EventType.leaveTheRoom]: ({ userName }: ChatEventType) => `${userName} leaves the room`
}

const ChatEvent = (chatEvent: ChatEventType) => {
    const description = ChatEventDescription[chatEvent.eventType](chatEvent);

    return (
        <div className="chat-event">
            {description}
        </div>
    );
}

export default ChatEvent;