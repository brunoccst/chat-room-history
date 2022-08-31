import { TimeInterval } from "types";

export const formatDate = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
    })
}

export const timeIntervalToText = (timeInterval: TimeInterval) => {
    const textDict: { [timeInterval: number]: string } = {
        [TimeInterval.MinuteByMinute]: "Minute by minute",
        [TimeInterval.Hourly]: "Hourly"
    }

    return textDict[timeInterval];
}

export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
    list.reduce((previous, currentItem) => {
        const group = getKey(currentItem);
        if (!previous[group]) previous[group] = [];
        previous[group].push(currentItem);
        return previous;
    }, {} as Record<K, T[]>);