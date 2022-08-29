import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ChatEntryContext from 'contexts/ChatEntryContext';
import TimeInterval, { toText } from 'types/TimeInterval';
import TimestampChatEntryGroup from 'types/TimestampChatEntryGroup';
import Row from 'components/row/Row';
import './chat-entry-list.scss';

export const ChatEntryList = observer(() => {
    const chatEntryContext = useContext(ChatEntryContext);

    const AggregationLevel = observer(() => {
        const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const numberValue = Number(event.target.value);
            const timeInterval = numberValue as TimeInterval;
            chatEntryContext.setTimeInterval(timeInterval);
        }

        return (
            <div className="aggregation-level">
                <label>Aggregation level:</label>
                <select value={chatEntryContext.timeInterval} onChange={onChange}>
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
    });

    const TimestampChatEntryGroups = observer(() => {
        return (
            <>
                {
                    chatEntryContext.timestampChatEntryGroups
                        .map((timestampGroup: TimestampChatEntryGroup) => {
                            return (
                                <Row {...timestampGroup}></Row>
                            )
                        })
                }
            </>
        )
    });

    return (
        <div className="chat-entry-list">
            <AggregationLevel></AggregationLevel>
            <TimestampChatEntryGroups></TimestampChatEntryGroups>
        </div>
    );
});