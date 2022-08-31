import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ChatEventGroupContext from 'contexts';
import { AggregationLevel, ChatEventGroup, LoadSpinner } from 'components';
import './chat-event-group-list.scss';
import { ChatEventGroup as ChatEventGroupType } from 'types';

export const ChatEventGroupList = observer(() => {
    const chatEventGroupContext = useContext(ChatEventGroupContext);
    const key = (chatEventGroup: ChatEventGroupType) => `${chatEventGroup.timestamp.toString()}|${chatEventGroup.eventType}`;

    return (
        <div className="chat-event-group-list">
            <AggregationLevel />
            {
                chatEventGroupContext.isLoading
                    ? <LoadSpinner />
                    : chatEventGroupContext
                        .chatEventGroups
                        .map(chatEventGroup => {
                            return (
                                <ChatEventGroup
                                    {...chatEventGroup}
                                    key={key(chatEventGroup)}
                                />
                            );
                        })
            }
        </div>
    );
});