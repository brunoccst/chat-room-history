import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ChatEntryContext from 'contexts/ChatEntryContext';
import TimeInterval, { toText } from 'types/TimeInterval';
import TimestampChatEntryGroup from 'types/TimestampChatEntryGroup';
import Row, { RowProps } from 'components/row/Row';
import './chat-entry-list.scss';

/**
 * An element which displays a header for switching the aggregation level
 * and a list of chat entries below.
 */
export const ChatEntryList = observer(() => {
    const chatEntryContext = useContext(ChatEntryContext);

    /**
     * The aggregation header.
     */
    const AggregationLevel = observer(() => {
        /**
         * Updates the time interval in the state with the selected value.
         * @param event Event thrown when the HTMLSelectElement value has change
         */
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

    /**
     * The list of chat entries, displayed differently according to the aggregation level
     */
    const TimestampChatEntryGroups = observer(() => {
        return (
            <>
                {
                    // Map each timestamp group into a row
                    chatEntryContext.timestampChatEntryGroups
                        .map((timestampGroup: TimestampChatEntryGroup) => {
                            const props: RowProps = {
                                timeInterval: chatEntryContext.timeInterval,
                                timestampGroup: timestampGroup
                            }

                            return (
                                <Row {...props}></Row>
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