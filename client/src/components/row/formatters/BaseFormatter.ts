import { EventType, TimestampChatEntryGroup } from "types";

type FormatterDict = {
    [eventType: number]: (...params: any[]) => string
}

abstract class BaseFormatter {
    abstract EnterTheRoom: (...params: any[]) => string;
    abstract Comment: (...params: any[]) => string;
    abstract HighFiveAnotherPerson: (...params: any[]) => string;
    abstract LeaveTheRoom: (...params: any[]) => string;

    protected GetFormatter = (eventType: EventType) => {
        const informationFormatters: FormatterDict = {
            [EventType.enterTheRoom]: this.EnterTheRoom,
            [EventType.comment]: this.Comment,
            [EventType.highFiveAnotherUser]: this.HighFiveAnotherPerson,
            [EventType.leaveTheRoom]: this.LeaveTheRoom
        }

        return informationFormatters[eventType];
    }

    abstract GetEntries: (timestampChatEntryGroup: TimestampChatEntryGroup) => string[]
}

export default BaseFormatter;