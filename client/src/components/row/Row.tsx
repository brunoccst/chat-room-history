import TimestampChatEntryGroup from 'types/TimestampChatEntryGroup';
import TimeInterval from 'types/TimeInterval';
import RowRenderers from './specifications';
import './row.scss';

export type RowProps = {
    timestampGroup: TimestampChatEntryGroup;
    timeInterval: TimeInterval;
}

const Row = ({ timestampGroup, timeInterval }: RowProps) => {
    return RowRenderers[timeInterval](timestampGroup);
}

export default Row;