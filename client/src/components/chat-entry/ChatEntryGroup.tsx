import { TimestampChatEntryGroup, TimeInterval, EventTypeChatEntryGroup, EventType } from 'types';
import Row, { RowInfo } from './row';
import Formatters from './formatters';

export type RowProps = {
    timestampGroup: TimestampChatEntryGroup;
    timeInterval: TimeInterval;
}

/**
 * An element that renders a given timestamp group according to the specified time interval.
 * @param param0 Properties
 * @returns Element renderer for the specified time interval
 */
const ChatEntryGroup = ({ timestampGroup, timeInterval }: RowProps) => {
    const entries = Formatters[timeInterval].GetEntries(timestampGroup);
    const rowInfo: RowInfo = {
        entries: entries,
        timestamp: timestampGroup.timestamp
    };

    return <Row {...rowInfo} />
}

export default ChatEntryGroup;