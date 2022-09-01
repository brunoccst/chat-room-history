import { observer } from "mobx-react-lite";
import { useContext } from "react";
import ChatEventGroupContext from 'contexts';
import { TimeInterval } from "types";
import { GetTimeIntervalResourceKey } from "utils";
import { useTranslation } from "react-i18next";
import './aggregation-level.scss';

const AggregationLevel = observer(() => {
    const chatEventGroupContext = useContext(ChatEventGroupContext);
    const { t } = useTranslation();

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const numberValue = Number(event.target.value);
        const timeInterval = numberValue as TimeInterval;
        chatEventGroupContext.setTimeInterval(timeInterval);
    }

    return (
        <div className="aggregation-level">
            <label>{t("aggregationLevel")}</label>
            <select value={chatEventGroupContext.timeInterval} onChange={onChange}>
                {
                    // Map all values of TimeInterval as an option
                    Object.keys(TimeInterval)
                        .filter(key => !Number.isNaN(Number(key)))
                        .map(key => {
                            const timeInterval = Number(key) as TimeInterval;
                            const resourceKey = GetTimeIntervalResourceKey(timeInterval);
                            const text = t(resourceKey);

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