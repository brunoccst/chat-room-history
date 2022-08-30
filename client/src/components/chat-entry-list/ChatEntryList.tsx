import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ChatEntryContext from 'contexts';
import { TimestampChatEntryGroup, TimeInterval } from 'types';
import { toText } from 'utils';
import './chat-entry-list.scss';
import Formatters from 'components/row/formatters';
import Row, { RowInfo } from 'components/row';

/**
 * An element which displays a header for switching the aggregation level
 * and a list of chat entries below.
 */
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
                        // Map all values of TimeInterval as an option
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
                            const entries = Formatters[chatEntryContext.timeInterval].GetEntries(timestampGroup);
                            const rowInfo: RowInfo = {
                                entries: entries,
                                timestamp: timestampGroup.timestamp,
                                includeTimestampOnAll: chatEntryContext.timeInterval === TimeInterval.MinuteByMinute
                            };

                            return <Row {...rowInfo} />
                        })
                }
            </>
        )
    });

    return (
        <div className="chat-entry-list">
            <AggregationLevel />
            <TimestampChatEntryGroups />
        </div>
    );
});