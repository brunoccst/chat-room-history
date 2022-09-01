import { ChatEvent, ChatEventGroup, EventType } from "types"
import { i18next } from 'utils';

type ChatEventDescriptionDict = { [eventType: string]: (chatEvent: ChatEvent) => string }

const ChatEventDescription: ChatEventDescriptionDict = {
    [EventType.enterTheRoom]: ({ userName }: ChatEvent) => i18next.t(`userEnteredTheRoom`, { userName }),
    [EventType.comment]: ({ userName, data }: ChatEvent) => i18next.t(`userCommented`, { userName: userName, comment: data }),
    [EventType.highFiveAnotherUser]: ({ userName, data }: ChatEvent) => i18next.t(`userHighFivedTargetUser`, { userName: userName, targetUserName: data }),
    [EventType.leaveTheRoom]: ({ userName }: ChatEvent) => i18next.t(`userLeftTheRoom`, { userName })
}

const GetDescription = (chatEventGroup: ChatEventGroup) => {
    return chatEventGroup.chatEvents.map(c => ChatEventDescription[chatEventGroup.eventType](c));
}

export default GetDescription;