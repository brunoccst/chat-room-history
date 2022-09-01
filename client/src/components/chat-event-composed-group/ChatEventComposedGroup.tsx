import { useContext } from "react";
import ChatEventContext from 'contexts';
import { Composed, Single } from "components";
import { ChatEventGroup as ChatEventGroupType, ChatEvent as ChatEventType, TimeInterval } from "types";
import { FormatDate } from "utils";
import './chat-event-composed-group.scss';

const ChatEventComposedGroup = (chatEventGroups: ChatEventGroupType[]) => {
    const chatEventContext = useContext(ChatEventContext);

    const formattedDate = FormatDate(new Date(chatEventGroups[0].timestamp));
    const key = (chatEvent: ChatEventType) => `${chatEvent.timestamp.toString()}|${chatEvent.eventType}|${chatEvent.userName}}]`;

    return (
        <div className="chat-event-composed-group">
            <div className="timestamp">{formattedDate}</div>
            <div className="chat-events">
                {
                    chatEventGroups.map(group => {
                        return (chatEventContext.timeInterval === TimeInterval.MinuteByMinute)
                            ? group.chatEvents.map(chatEvent =>
                                <Single {...chatEvent} key={key(chatEvent)} />)
                            : <Composed {...group} />
                    })
                }
            </div>
        </div>
    );
}

export default ChatEventComposedGroup;