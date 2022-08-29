import { TimestampChatEntryGroup, TimeInterval } from 'types';
import MinuteByMinuteRow from './MinuteByMinuteRow';
import HourlyRow from './HourlyRow';

type RowRendererTimeIntervalDict = {
    [timeInterval: number]: (timestampGroup: TimestampChatEntryGroup) => JSX.Element
}

const RowRenderers: RowRendererTimeIntervalDict = {
    [TimeInterval.MinuteByMinute]: MinuteByMinuteRow,
    [TimeInterval.Hourly]: HourlyRow
}

export default RowRenderers;