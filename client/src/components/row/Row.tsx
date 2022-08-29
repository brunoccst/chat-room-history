import { TimestampChatEntryGroup, TimeInterval } from 'types';
import RowRenderers from './specifications';
import './row.scss';

export type RowProps = {
    timestampGroup: TimestampChatEntryGroup;
    timeInterval: TimeInterval;
}

/**
 * An element that renders a given timestamp group according to the specified time interval.
 * @param param0 Properties
 * @returns Element renderer for the specified time interval
 */
const Row = ({ timestampGroup, timeInterval }: RowProps) => {
    return RowRenderers[timeInterval](timestampGroup);
}

export default Row;