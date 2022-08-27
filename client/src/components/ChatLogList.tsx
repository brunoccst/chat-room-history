import react, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ChatLogContext from '../contexts/ChatLogContext';
import ChatLog from '../types/ChatLog';

export const ChatLogList = observer(() => {
    const chatLogContext = useContext(ChatLogContext);

    return (
        <div>
            {
                chatLogContext.map((value: ChatLog) => {
                    return (
                        <div>
                            {`${value.Timestamp} | ${value.EventType} | ${value.UserName} | ${value.Data}`}
                        </div>
                    );
                })
            }
        </div>
    );
});