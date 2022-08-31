import { ChatEvent, ChatEventGroup, EventType } from "types";

type ChatEventDescriptionDict = { [eventType: string]: (...args: [number, ...any]) => string }

const ChatEventDescription: ChatEventDescriptionDict = {
    [EventType.enterTheRoom]: (count: number) => `${count} entered the room`,
    [EventType.comment]: (count: number) => `${count} comments`,
    [EventType.highFiveAnotherUser]: (count: number, peopleCount: number) => `${count} people high-fived ${peopleCount} people`,
    [EventType.leaveTheRoom]: (count: number) => `${count} left the room`
}

const Composed = (chatEventGroup: ChatEventGroup) => {
    const formatter = ChatEventDescription[chatEventGroup.eventType];
    const count = chatEventGroup.chatEvents.length;
    const description = (chatEventGroup.eventType === EventType.highFiveAnotherUser)
        ? formatter(count, 100)
        : formatter(count);

    return (
        <div className="chat-event composed">
            {description}
        </div>
    );
}

export default Composed;