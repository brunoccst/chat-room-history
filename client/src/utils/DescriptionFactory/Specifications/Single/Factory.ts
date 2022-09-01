import { ChatEvent, ChatEventGroup, EventType } from "types"

type ChatEventDescriptionDict = { [eventType: string]: (chatEvent: ChatEvent) => string }

const ChatEventDescription: ChatEventDescriptionDict = {
    [EventType.enterTheRoom]: ({ userName }: ChatEvent) => `${userName} enters the room`,
    [EventType.comment]: ({ userName, data }: ChatEvent) => `${userName} comments: "${data}"`,
    [EventType.highFiveAnotherUser]: ({ userName, data }: ChatEvent) => `${userName} high-fives ${data}`,
    [EventType.leaveTheRoom]: ({ userName }: ChatEvent) => `${userName} leaves the room`
}

const GetDescription = (chatEventGroup: ChatEventGroup) => {
    return chatEventGroup.chatEvents.map(c => ChatEventDescription[chatEventGroup.eventType](c));
}

export default GetDescription;