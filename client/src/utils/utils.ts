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
