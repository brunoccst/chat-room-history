import { useContext } from "react";
import ChatEventContext from 'contexts';
import { Composed, Single } from "components";
import { ChatEventGroup as ChatEventGroupType, ChatEvent as ChatEventType, TimeInterval } from "types";
import { FormatDate } from "utils";
import './chat-event-group.scss';

const ChatEventGroup = (chatEventGroup: ChatEventGroupType) => {
    const chatEventContext = useContext(ChatEventContext);

    const formattedDate = FormatDate(new Date(chatEventGroup.timestamp));
    const key = (chatEvent: ChatEventType) => `${chatEvent.timestamp.toString()}|${chatEvent.eventType}|${chatEvent.userName}}]`;

    return (
        <div className="chat-event-group">
            <div className="timestamp">{formattedDate}</div>
            <div className="chat-events">
                {
                    (chatEventContext.timeInterval === TimeInterval.MinuteByMinute)
                        ? chatEventGroup.chatEvents.map(chatEvent =>
                            <Single {...chatEvent} key={key(chatEvent)} />)
                        : <Composed {...chatEventGroup} />
                }
            </div>
        </div>
    );
}

export default ChatEventGroup;