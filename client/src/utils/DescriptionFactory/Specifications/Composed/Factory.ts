import { ChatEvent, ChatEventGroup, EventType } from 'types';
import { GroupBy } from 'utils';

type ChatEventDescriptionDict = { [eventType: string]: (...args: any[]) => string }

const ChatEventDescription: ChatEventDescriptionDict = {
    [EventType.enterTheRoom]: (count: number) => `${count} entered the room`,
    [EventType.comment]: (count: number) => `${count} comments`,
    [EventType.highFiveAnotherUser]: (count1: number, count2: number) => `${count1} people high-fived ${count2} people`,
    [EventType.leaveTheRoom]: (count: number) => `${count} left the room`
}

const EventCountDescription = (chatEventGroup: ChatEventGroup) => {
    return ChatEventDescription[chatEventGroup.eventType](chatEventGroup.chatEvents.length);
}

const HighFiveDescription = (chatEventGroup: ChatEventGroup) => {
    const highFivePerInitiator: Record<string, ChatEvent[]> = GroupBy(chatEventGroup.chatEvents, (c => c.userName));
    const highFivePerTarget: Record<number, string[]> = GroupBy(Object.keys(highFivePerInitiator), (k => highFivePerInitiator[k].length));

    let descriptions: string[] = [];
    Object.keys(highFivePerTarget).forEach((key) => {
        const count1 = Number(key);
        const count2 = highFivePerTarget[count1].length;
        const description = ChatEventDescription[chatEventGroup.eventType](count1, count2);
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