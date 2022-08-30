import BaseFormatter from "components/chat-entry/formatters/BaseFormatter";
import { ChatEntry, EventType, EventTypeChatEntryGroup, TimestampChatEntryGroup } from "types";

class Hourly extends BaseFormatter {
    EnterTheRoom = (count: number) => {
        return (count === 1)
            ? `${count} person entered`
            : `${count} people entered`;
    }

    Comment = (count: number) => {
        return (count === 1)
            ? `${count} comment`
            : `${count} comments`;
    }

    HighFiveAnotherPerson = (count: number, otherPeopleCount: number) => {
        if (count === 1) {
            return (otherPeopleCount === 1)
                ? `${count} person high-fived ${otherPeopleCount} other person`
                : `${count} person high-fived ${otherPeopleCount} other people`
        }
        else {
            return (otherPeopleCount === 1)
                ? `${count} people high-fived ${otherPeopleCount} other person`
                : `${count} people high-fived ${otherPeopleCount} other people`
        }
    }

    LeaveTheRoom = (count: number) => {
        return (count === 1)
            ? `${count} person left`
            : `${count} people left`;
    }

    GetEntries = (timestampChatEntryGroup: TimestampChatEntryGroup) => {
        const result: string[] = [];

        timestampChatEntryGroup
            .eventTypeChatEntryGroups
            .forEach((eventTypeGroup: EventTypeChatEntryGroup) => {
                switch (eventTypeGroup.eventType) {
                    case EventType.highFiveAnotherUser:
                        const userNameGroups = new Map<string, number>();
                        eventTypeGroup.events.forEach((event: ChatEntry) => {
                            const currentValue = userNameGroups.get(event.userName) ?? 0;
                            userNameGroups.set(event.userName, currentValue + 1);
                        });

                        const highFiveGroups = new Map<number, number>();
                        userNameGroups.forEach((value: number) => {
                            const currentValue = highFiveGroups.get(value) ?? 0;
                            highFiveGroups.set(value, currentValue + 1);
                        });

                        highFiveGroups.forEach((value: number, key: number) => {
                            const format = this.GetFormatter(eventTypeGroup.eventType);
                            const entry = format(value, key);
                            result.push(entry);
                        });
                        break;
                        
                    default:
                        const format = this.GetFormatter(eventTypeGroup.eventType);
                        const entry = format(eventTypeGroup.events.length);
                        result.push(entry);
                        break;
                }
            })

        return result;
    };
}

export default Hourly;