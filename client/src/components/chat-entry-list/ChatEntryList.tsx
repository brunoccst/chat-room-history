import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ChatEntryContext from 'contexts';
import { TimestampChatEntryGroup, TimeInterval } from 'types';
import { toText } from 'utils';
import ChatEntryGroup, { RowProps } from 'components/chat-entry';
import './chat-entry-list.scss';

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
                            const props: RowProps = {
                                timeInterval: chatEntryContext.timeInterval,
                                timestampGroup: timestampGroup
                            }

                            return (
                                <ChatEntryGroup {...props} />
                            )
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