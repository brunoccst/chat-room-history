import { TimeInterval } from "types";

export const formatToTimeOnly = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
    })
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
