import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ChatLogContext from '../../contexts/ChatLogContext';
import ChatLog from '../../types/ChatLog';
import Row from 'components/row/Row';
import './chat-log-list.scss';

export const ChatLogList = observer(() => {
    const chatLogContext = useContext(ChatLogContext);

    return (
        <div className="chat-log-list">
            {
                chatLogContext.map((chatLog: ChatLog) => {
                    const key = `${chatLog.timestamp.toISOString()}`;
                    return <Row {...chatLog} key={key}></Row>;
                })
            }
        </div>
    );
});