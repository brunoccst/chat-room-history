import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ChatEntryContext from '../../contexts/ChatEntryContext';
import ChatEntry from '../../types/ChatEntry';
import Row from 'components/row/Row';
import './chat-entry-list.scss';
import TimeInterval, { toText } from 'types/TimeInterval';

export const ChatEntryList = observer(() => {
    const chatEntryContext = useContext(ChatEntryContext);
    
    const Header = () => {
        const [timeInterval, setTimeInterval] = useState(TimeInterval.MinuteByMinute);
        const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const numberValue = Number(event.target.value);
            setTimeInterval(numberValue as TimeInterval);
        }

        useEffect(() => {
            chatEntryContext.loadData(timeInterval);
        }, [timeInterval]);

        return (
            <div className="header">
                <label>Time interval:</label>
                <select onChange={onChange} value={timeInterval}>
                    {
                        Object.values(TimeInterval)
                            .filter((v) => !isNaN(Number(v)))
                            .map((v: string | TimeInterval) => {
                                const value = v as TimeInterval;
                                const text = toText(value);
                                return (
                                    <option
                                        key={value}
                                        value={value}>
                                        {text}
                                    </option>
                                )
                            })
                    }
                </select>
            </div>
        );
    }

    const Rows = () => {
        const rowList = chatEntryContext.chatEntryList.map((chatEntry: ChatEntry) => {
            const key = `${chatEntry.timestamp.toISOString()}`;
            return <Row {...chatEntry} key={key}></Row>;
        });

        return (
            <div>{rowList}</div>
        );
    };

    return (
        <div className="chat-log-list">
            <Header></Header>
            <Rows></Rows>
        </div>
    );
});