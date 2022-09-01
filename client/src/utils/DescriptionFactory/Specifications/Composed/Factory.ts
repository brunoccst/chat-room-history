import { ChatEvent, ChatEventGroup, EventType } from 'types';
import { GroupBy, i18next } from 'utils';

type ChatEventDescriptionDict = { [eventType: string]: (...args: any[]) => string }

const ChatEventDescription: ChatEventDescriptionDict = {
    [EventType.enterTheRoom]: (count: number) => i18next.t(`personEnteredTheRoom`, { count }),
    [EventType.comment]: (count: number) => i18next.t(`personCommented`, { count }),
    [EventType.highFiveAnotherUser]: (initiatorCount: number, targetCount: number) => i18next.t(`personHighFivedTargetPerson`, { initiatorCount: initiatorCount, targetCount: targetCount }),
    [EventType.leaveTheRoom]: (count: number) => i18next.t(`personLeftTheRoom`, { count })
}

const EventCountDescription = (chatEventGroup: ChatEventGroup) => {
    return ChatEventDescription[chatEventGroup.eventType](chatEventGroup.chatEvents.length);
}

const HighFiveDescription = (chatEventGroup: ChatEventGroup) => {
    const highFivePerInitiator: Record<string, ChatEvent[]> = GroupBy(chatEventGroup.chatEvents, (c => c.userName));
    const highFivePerTarget: Record<number, string[]> = GroupBy(Object.keys(highFivePerInitiator), (k => highFivePerInitiator[k].length));

    let descriptions: string[] = [];
    Object.keys(highFivePerTarget).forEach((key) => {
        const count = Number(key);
        const targetCount = highFivePerTarget[count].length;
        const description = ChatEventDescription[chatEventGroup.eventType](count, targetCount);
        descriptions.push(description);
    })

    return descriptions;
}

type DescriptionSpecificationDict = { [eventType: string]: (chatEventGroup: ChatEventGroup) => string | string[] }

const DescriptionSpecifications: DescriptionSpecificationDict = {
    [EventType.enterTheRoom]: EventCountDescription,
    [EventType.comment]: EventCountDescription,
    [EventType.highFiveAnotherUser]: HighFiveDescription,
    [EventType.leaveTheRoom]: EventCountDescription,
}

const GetDescriptions = (chatEventGroup: ChatEventGroup) => {
    return DescriptionSpecifications[chatEventGroup.eventType](chatEventGroup);
}

export default GetDescriptions;