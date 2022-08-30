import BaseFormatter from "components/row/formatters/BaseFormatter";
import { ChatEntry, EventTypeChatEntryGroup, TimestampChatEntryGroup } from "types";

class MinuteByMinute extends BaseFormatter {
    EnterTheRoom = ({ userName }: ChatEntry) => `${userName} enters the room`;
    Comment = ({ userName, data }: ChatEntry) => `${userName} comments: "${data}"`;
    HighFiveAnotherPerson = ({ userName, data }: ChatEntry) => `${userName} high-fives "${data}"`;
    LeaveTheRoom = ({ userName }: ChatEntry) => `${userName} leaves the room`;

    GetEntries = (timestampChatEntryGroup: TimestampChatEntryGroup) => {
        const result: string[] = [];

        timestampChatEntryGroup
            .eventTypeChatEntryGroups
            .forEach((eventTypeGroup: EventTypeChatEntryGroup) => {
                eventTypeGroup
                    .events
                    .forEach((chatEntry: ChatEntry) => {
                        const format = this.GetFormatter(chatEntry.eventType);
                        const entry = format(chatEntry);
                        result.push(entry);
                    });
            })

        return result;
    };
}

export default MinuteByMinute;