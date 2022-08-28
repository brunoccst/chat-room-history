enum TimeInterval {
    MinuteByMinute,
    Hourly
}

/**
 * Parses the enumerator into readable text
 * @param timeInterval Time interval enum value
 * @returns Readable text for the given time interval. Empty string if no definition set.
 */
export const toText = (timeInterval: TimeInterval) => {
    switch (timeInterval) {
        case TimeInterval.MinuteByMinute:
            return "Minute by minute";
        case TimeInterval.Hourly:
            return "Hourly";
        default:
            return "";
    }
}

export default TimeInterval;