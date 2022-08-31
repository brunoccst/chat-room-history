import { makeAutoObservable } from 'mobx';
import { ChatEventGroup, TimeInterval } from 'types';
import APIAgent from 'agents';

class ChatEventStore {
    timeInterval: TimeInterval = TimeInterval.MinuteByMinute;
    chatEventGroups: ChatEventGroup[] = [];
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
        APIAgent.GetChatEventGroups(this.timeInterval)
            .then(async (value: Response) => {
                if (value.ok)
                    return value.json();
                else
                    throw Error(value.statusText);
            })
            .then((chatEventGroups: ChatEventGroup[]) => {
                this.chatEventGroups = chatEventGroups;
            })
            .finally(() => {
                this.isLoading = false;
            })
    }
}

export { ChatEventStore };

const chatEventStore = new ChatEventStore();

export default chatEventStore;