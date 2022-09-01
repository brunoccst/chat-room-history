import { TimeInterval } from "types";

export const FormatDate = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
    })
}

export const GetTimeIntervalResourceKey = (timeInterval: TimeInterval) => {
    const textDict: { [timeInterval: number]: string } = {
        [TimeInterval.MinuteByMinute]: "minuteByMinute",
        [TimeInterval.Hourly]: "hourly"
    }

    return textDict[timeInterval];
}

export const GroupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
    list.reduce((previous, currentItem) => {
        const group = getKey(currentItem);
        if (!previous[group]) previous[group] = [];
        previous[group].push(currentItem);
        return previous;
    }, {} as Record<K, T[]>);