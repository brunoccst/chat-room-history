import react, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ChatLogContext from '../../contexts/ChatLogContext';
import ChatLog from '../../types/ChatLog';
import './chat-log-list.scss';

export const ChatLogList = observer(() => {
    const chatLogContext = useContext(ChatLogContext);

    console.log(chatLogContext[0]);
    return (
        <div>
            {
                chatLogContext.map((chatLog: ChatLog | undefined) => {
                    return (
                        <div>{chatLog?.Timestamp?.toISOString()}</div>
                    );
                })
            }
        </div>
    );
});