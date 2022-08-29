import ChatEntry from "types/ChatEntry";
import EventType from "types/EventType";
import EventTypeChatEntryGroup from "types/EventTypeChatEntryGroup";
import TimestampChatEntryGroup from "types/TimestampChatEntryGroup";
import { formatToTimeOnly } from "utils/utils";

const EnterTheRoom = (count: number) => (count === 1) ? `${count} person entered` : `${count} people entered`;
const Comment = (count: number) => (count === 1) ? `${count} comment` : `${count} comments`;
const HighFiveAnotherUser = (count: number, otherPeopleCount: number) => {
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
};
const LeaveTheRoom = (count: number) => (count === 1) ? `${count} person left` : `${count} people left`;

type InformationFormatterDict = {
    [eventType: number]: (count: number, otherPeopleCount: number) => string
}

const InformationFormatters: InformationFormatterDict = {
    [EventType.enterTheRoom]: EnterTheRoom,
    [EventType.comment]: Comment,
    [EventType.highFiveAnotherUser]: HighFiveAnotherUser,
    [EventType.leaveTheRoom]: LeaveTheRoom
}

const getHighFiveInformations = (events: ChatEntry[]) => {
    const userNameGroups = new Map<string, number>();
    events.forEach((event: ChatEntry) => {
        const currentValue = userNameGroups.get(event.userName) ?? 0;
        userNameGroups.set(event.userName, currentValue + 1);
    });

    const highFiveGroups = new Map<number, number>();
    userNameGroups.forEach((value: number) => {
        const currentValue = highFiveGroups.get(value) ?? 0;
        highFiveGroups.set(value, currentValue + 1);
    });

    const result: string[] = [];
    highFiveGroups.forEach((value: number, key: number) => {
        const information = InformationFormatters[EventType.highFiveAnotherUser](value, key);
        result.push(information);
    })

    return result;
}

const HourlyRow = (timestampGroup: TimestampChatEntryGroup) => {
    const timestamp = formatToTimeOnly(new Date(timestampGroup.timestamp));

    return (
        <div className='row'>
            <div>{timestamp}</div>
            <div className="informations">
                {
                    timestampGroup
                        .eventTypeChatEntryGroups
                        .map((eventTypeGroup: EventTypeChatEntryGroup) => {
                            let informations: string[];

                            if (eventTypeGroup.eventType === EventType.highFiveAnotherUser) {
                                informations = getHighFiveInformations(eventTypeGroup.events);
                            }
                            else {
                                const formatterFunction = InformationFormatters[eventTypeGroup.eventType];
                                if (eventTypeGroup.eventType === EventType.enterTheRoom)
                                    console.log(eventTypeGroup.events);
                                const information = formatterFunction(eventTypeGroup.events.length, 0);
                                informations = [information];
                            }

                            return (
                                <>
                                    {
                                        informations.map((value: string) => {
                                            return <div>{value}</div>;
                                        })
                                    }
                                </>
                            )
                        })
                }
            </div>
        </div>
    );
}

export default HourlyRow;