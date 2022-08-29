import TimestampChatEntryGroup from 'types/TimestampChatEntryGroup';
import TimeInterval from 'types/TimeInterval';
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