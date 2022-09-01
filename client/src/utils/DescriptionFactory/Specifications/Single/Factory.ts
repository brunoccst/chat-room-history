import { ChatEvent, ChatEventGroup, EventType } from "types"
import { i18next } from 'utils';

type ChatEventDescriptionDict = { [eventType: string]: (chatEvent: ChatEvent) => string }

const ChatEventDescription: ChatEventDescriptionDict = {
    [EventType.enterTheRoom]: ({ userName }: ChatEvent) => i18next.t(`{{userName}} entered the room`, { userName }),
    [EventType.comment]: ({ userName, data }: ChatEvent) => i18next.t(`{{userName}} commented: \"{{comment}}\"`, { userName: userName, comment: data }),
    [EventType.highFiveAnotherUser]: ({ userName, data }: ChatEvent) => i18next.t(`{{userName}} high-fived {{targetUserName}}`, { userName: userName, targetUserName: data }),
    [EventType.leaveTheRoom]: ({ userName }: ChatEvent) => i18next.t(`{{userName}} left the room`, { userName })
}

const GetDescription = (chatEventGroup: ChatEventGroup) => {
    console.log(i18next.getResourceBundle('enUS', 'translation'));
    console.log(i18next.t("{{userName}} entered the room", { userName: "hey" }));
    console.log(i18next.language);
    console.log(i18next.options);
    return chatEventGroup.chatEvents.map(c => ChatEventDescription[chatEventGroup.eventType](c));
}

export default GetDescription;