import { observer } from "mobx-react-lite";
import { useContext } from "react";
import ChatEventGroupContext from 'contexts';
import { TimeInterval } from "types";
import { timeIntervalToText } from "utils";
import './aggregation-level.scss';

const AggregationLevel = observer(() => {
    const chatEventGroupContext = useContext(ChatEventGroupContext);

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const numberValue = Number(event.target.value);
        const timeInterval = numberValue as TimeInterval;
        chatEventGroupContext.setTimeInterval(timeInterval);
    }

    return (
        <div className="aggregation-level">
            <label>Aggregation level:</label>
            <select value={chatEventGroupContext.timeInterval} onChange={onChange}>
                {
                    // Map all values of TimeInterval as an option
                    Object.keys(TimeInterval)
                        .filter(key => !Number.isNaN(Number(key)))
                        .map(key => {
                            const timeInterval = Number(key) as TimeInterval;
                            const text = timeIntervalToText(timeInterval);
                            return (
                                <option key={key} value={key}>{text}</option>
                            )
                        })
                }
            </select>
        </div>
    );
});

export default AggregationLevel;