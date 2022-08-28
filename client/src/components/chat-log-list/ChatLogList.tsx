import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ChatLogContext from '../../contexts/ChatLogContext';
import ChatLog from '../../types/ChatLog';
import Row from 'components/row/Row';
import './chat-log-list.scss';
import TimeInterval from 'types/TimeInterval';

export const ChatLogList = observer(() => {
    const chatLogContext = useContext(ChatLogContext);

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const numberValue = Number(event.target.value);
        const timeInterval = numberValue as TimeInterval;
        chatLogContext.setTimeInterval(timeInterval);
    }

    return (
        <div className="chat-log-list">
            <select value={chatLogContext.timeInterval} onChange={onChange}>
                <option value={TimeInterval.MinuteByMinute}>Minute by minute</option>
                <option value={TimeInterval.Hourly}>Hourly</option>
            </select>
            {
                chatLogContext.chatLogList.map((chatLog: ChatLog) => {
                    const key = `${chatLog.timestamp.toISOString()}`;
                    return <Row {...chatLog} key={key}></Row>;
                })
            }
        </div>
    );
});