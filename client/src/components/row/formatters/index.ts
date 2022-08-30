import { TimeInterval } from "types";
import BaseFormatter from "./BaseFormatter";
import Hourly from "./Hourly";
import MinuteByMinute from "./MinuteByMinute";

type FormattersDict = {
    [timeInterval: number]: BaseFormatter
}

const Formatters: FormattersDict = {
    [TimeInterval.Hourly]: new Hourly(),
    [TimeInterval.MinuteByMinute]: new MinuteByMinute()
}

export default Formatters;