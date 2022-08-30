import { makeAutoObservable } from 'mobx';
import { TimestampChatEntryGroup, TimeInterval } from 'types';
import APIAgent from 'agents';

class ChatEntryStore {
    timeInterval: TimeInterval = TimeInterval.MinuteByMinute;
    timestampChatEntryGroups: TimestampChatEntryGroup[] = [];
    isLoading: boolean = false;

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
        this.isLoading = true;
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
            .finally(() => {
                this.isLoading = false;
            })
    }
}

export { ChatEntryStore };

const chatEntryStore = new ChatEntryStore();

export default chatEntryStore;