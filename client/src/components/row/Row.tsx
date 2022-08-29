import ChatEntry from 'types/ChatEntry';
import EventTypeChatEntryGroup from 'types/EventTypeChatEntryGroup';
import TimestampChatEntryGroup from 'types/TimestampChatEntryGroup';
import TimeInterval from 'types/TimeInterval';
import './row.scss';

// const SingleEntry = (chatEntry: ChatEntry) => {
//     const key = `${chatEntry.userName}${new Date(chatEntry.timestamp).toISOString()}`;
//     return (
//         <div key={key}>{chatEntry.userName}{chatEntry.data}</div>
//     );
// }

// const MultipleEntries = (chatEntries: ChatEntry[]) => {
//     return (
//         <>
//             {
//                 chatEntries.map((chatEntry: ChatEntry) => {
//                     const key = `${chatEntry.userName}${new Date(chatEntry.timestamp).toISOString()}`;
//                     return (
//                         <div key={key}>{chatEntry.userName}{chatEntry.data}</div>
//                     );
//                 })
//             }
//         </>
//     )
// }

// const Renderers: { [timeInterval: number]: (chatEntry: ChatEntry[]) => JSX.Element } = {
//     [TimeInterval.MinuteByMinute]: (chatEntries: ChatEntry[]) => <SingleEntry {...chatEntries[0]}></SingleEntry>,
//     [TimeInterval.Hourly]: (chatEntries: ChatEntry[]) => <MultipleEntries {...chatEntries}></MultipleEntries>
// }

const Row = (timestampGroup: TimestampChatEntryGroup) => {
    return (
        <>
            {
                timestampGroup.eventTypeChatEntryGroups.map((eventTypeGroup: EventTypeChatEntryGroup) => {
                    return (
                        <div className='row'>
                            <div>{timestampGroup.timestamp}</div>
                            <div>{eventTypeGroup.eventType}</div>
                            <div className="informations">
                                {
                                    eventTypeGroup.events.map((event: ChatEntry) => {
                                        return (<div>{event.userName}</div>);
                                    })
                                }
                            </div>
                        </div>
                    );
                })
            }
        </>
    )
    // const timestamp = new Date(chatEntryTimestampGroup.timestamp).toLocaleTimeString('en-US', {
    //     hour: 'numeric',
    //     minute: 'numeric'
    // });

    // const informations = (chatEntryTimestampGroup.eventTypeChatEntryGroups)
    //     ? chatEntryTimestampGroup
    //         .eventTypeChatEntryGroups
    //         .map((ceetg: EventTypeChatEntryGroup) => {
    //             return Renderers[timeInterval](ceetg.events);
    //         })
    //     : <div>aaa</div>;

    // return (
    //     <div className='row'>
    //         <div>{timestamp}</div>
    //         <div className="informations">{informations}</div>
    //     </div>
    // );
}

export default Row;