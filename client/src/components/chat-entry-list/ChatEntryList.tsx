import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ChatLogContext from 'contexts/ChatEntryContext';
import ChatEntry from 'types/ChatEntry';
import Row from 'components/row/Row';
import TimeInterval, { toText } from 'types/TimeInterval';
import './chat-entry-list.scss';

export const ChatEntryList = observer(() => {
    const chatLogContext = useContext(ChatLogContext);

    const AggregationLevel = () => {
        const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const numberValue = Number(event.target.value);
            const timeInterval = numberValue as TimeInterval;
            chatLogContext.setTimeInterval(timeInterval);
        }

        return (
            <div className="aggregation-level">
                <label>Aggregation level:</label>
                <select value={chatLogContext.timeInterval} onChange={onChange}>
                    {
                        Object.keys(TimeInterval)
                            .filter(key => !Number.isNaN(Number(key)))
                            .map(key => {
                                const timeInterval = Number(key) as TimeInterval;
                                const text = toText(timeInterval);
                                return (
                                    <option key={key} value={key}>{text}</option>
                                )
                            })
                    }
                </select>
            </div>
        );
    }


    return (
        <div className="chat-entry-list">
            <AggregationLevel></AggregationLevel>
            {
                chatLogContext.chatEntryList.map((chatEntry: ChatEntry) => {
                    const key = `${chatEntry.timestamp.toISOString()}`;
                    return <Row {...chatEntry} key={key}></Row>;
                })
            }
        </div>
    );
});