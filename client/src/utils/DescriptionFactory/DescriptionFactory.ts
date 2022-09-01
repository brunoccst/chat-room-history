import { ChatEventGroup, TimeInterval } from "types";
import ChatEventStore from 'stores';
import { GetDescription, GetDescriptions as GetComposedDescription } from "./Specifications";
import { useTranslation } from 'react-i18next';

const GetDescriptions = (chatEventGroup: ChatEventGroup) => {
    useTranslation();

    let result: string[];

    switch (ChatEventStore.timeInterval) {
        case TimeInterval.Hourly:
            let _result = GetComposedDescription(chatEventGroup);
            result = (typeof _result === "string")
                ? [_result as string]
                : _result as string[]
            break;
        default:
            result = GetDescription(chatEventGroup);
            break;
    }

    return result;
}

export default GetDescriptions;