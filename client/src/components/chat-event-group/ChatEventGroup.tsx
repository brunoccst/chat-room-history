import { ChatEvent } from "components";
import { ChatEventGroup as ChatEventGroupType, ChatEvent as ChatEventType } from "types";
import { formatDate } from "utils";

const ChatEventGroup = ({ timestamp, chatEvents }: ChatEventGroupType) => {
    const formattedDate = formatDate(new Date(timestamp));
    const key = (chatEvent: ChatEventType) => `${chatEvent.timestamp.toString()}|${chatEvent.eventType}|${chatEvent.userName}}]`;

    return (
        <div className="chat-event-group">
            <div>{formattedDate}</div>
            <div className="chat-events">
                {
                    chatEvents.map(chatEvent => <ChatEvent {...chatEvent} key={key(chatEvent)} />)
                }
            </div>
        </div>
    );
}

export default ChatEventGroup;