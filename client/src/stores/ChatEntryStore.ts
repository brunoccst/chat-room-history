import { makeAutoObservable } from 'mobx';
import TimeInterval from 'types/TimeInterval';
import APIAgent from 'agents/APIAgent';
import TimestampChatEntryGroup from 'types/TimestampChatEntryGroup';

class ChatEntryStore {
    timeInterval: TimeInterval = TimeInterval.MinuteByMinute;
    timestampChatEntryGroups: TimestampChatEntryGroup[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadData();
    }

    setTimeInterval = (timeInterval: TimeInterval) => {
        this.timeInterval = timeInterval
        this.loadData();
    };

    /**
     * Loads the chat entries by making an API request and storing it in the state.
     */
    private loadData() {
        APIAgent.GetChatEntries(this.timeInterval)
            .then(async (value: Response) => {
                if (value.ok)
                    return value.json();
                else
                    throw Error(value.statusText);
            })
            .then((timestampChatEntryGroups: TimestampChatEntryGroup[]) => {
                this.timestampChatEntryGroups = timestampChatEntryGroups;
            })
    }
}

export { ChatEntryStore };

const chatEntryStore = new ChatEntryStore();

export default chatEntryStore;