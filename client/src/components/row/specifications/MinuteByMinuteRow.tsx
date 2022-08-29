import ChatEntry from "types/ChatEntry";
import EventType from "types/EventType";
import TimestampChatEntryGroup from "types/TimestampChatEntryGroup";
import { formatToTimeOnly } from "utils/utils";

const EnterTheRoom = (chatEntry: ChatEntry) => `${chatEntry.userName} enters the room`;
const Comment = (chatEntry: ChatEntry) => `${chatEntry.userName} comments: "${chatEntry.data}"`;
const HighFiveAnotherUser = (chatEntry: ChatEntry) => `${chatEntry.userName} high-fives "${chatEntry.data}"`;
const LeaveTheRoom = (chatEntry: ChatEntry) => `${chatEntry.userName} leaves the room`;

type InformationFormatterDict = {
    [eventType: number]: (chatEntry: ChatEntry) => string
}

const InformationFormatters: InformationFormatterDict = {
    [EventType.enterTheRoom]: EnterTheRoom,
    [EventType.comment]: Comment,
    [EventType.highFiveAnotherUser]: HighFiveAnotherUser,
    [EventType.leaveTheRoom]: LeaveTheRoom
}

const MinuteByMinuteRow = (timestampGroup: TimestampChatEntryGroup) => {
    const timestamp = formatToTimeOnly(new Date(timestampGroup.timestamp));

    const eventTypeGroup = timestampGroup.eventTypeChatEntryGroups[0];
    const informations = eventTypeGroup.events.map((chatEntry: ChatEntry) => {
        return InformationFormatters[eventTypeGroup.eventType](chatEntry);
    })

    return (
        <div className='row'>
            <div>{timestamp}</div>
            <div className="informations">
                {
                    informations.map((information: string) => <div>{information}</div>)
                }
            </div>
        </div>
    );
}

export default MinuteByMinuteRow;