import { ChatEvent, EventType } from "types";

type ChatEventDescriptionDict = { [eventType: string]: (chatEvent: ChatEvent) => string }

const ChatEventDescription: ChatEventDescriptionDict = {
    [EventType.enterTheRoom]: ({ userName }: ChatEvent) => `${userName} enters the room`,
    [EventType.comment]: ({ userName, data }: ChatEvent) => `${userName} comments: "${data}"`,
    [EventType.highFiveAnotherUser]: ({ userName, data }: ChatEvent) => `${userName} high-fives ${data}`,
    [EventType.leaveTheRoom]: ({ userName }: ChatEvent) => `${userName} leaves the room`
}

const Single = (chatEvent: ChatEvent) => {
    const description = ChatEventDescription[chatEvent.eventType](chatEvent);

    return (
        <div className="chat-event single">
            {description}
        </div>
    );
}

export default Single;