import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ChatLogContext from '../../contexts/ChatLogContext';
import ChatLog from '../../types/ChatLog';
import Row from 'components/row/Row';
import TimeInterval, { toText } from 'types/TimeInterval';
import './chat-log-list.scss';

export const ChatLogList = observer(() => {
    const chatLogContext = useContext(ChatLogContext);

    const Header = () => {
        const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const numberValue = Number(event.target.value);
            const timeInterval = numberValue as TimeInterval;
            chatLogContext.setTimeInterval(timeInterval);
        }

        return (
            <div>
                <label>Time interval:</label>
                <select value={chatLogContext.timeInterval} onChange={onChange}>
                    {
                        Object.keys(TimeInterval)
                            .filter(key => !Number.isNaN(Number(key)))
                            .map(key => {
                                const timeInterval = Number(key) as TimeInterval;
                                const text = toText(timeInterval);
                                return (
                                    <option value={key}>{text}</option>
                                )
                            })
                    }
                </select>
            </div>
        );
    }


    return (
        <div className="chat-log-list">
            <Header></Header>
            {
                chatLogContext.chatLogList.map((chatLog: ChatLog) => {
                    const key = `${chatLog.timestamp.toISOString()}`;
                    return <Row {...chatLog} key={key}></Row>;
                })
            }
        </div>
    );
});