import { makeAutoObservable } from 'mobx';
import TimeInterval from 'types/TimeInterval';
import APIAgent from 'agents/APIAgent';
import ChatEntry from 'types/ChatEntry';

class ChatEntryStore {
    timeInterval: TimeInterval = TimeInterval.MinuteByMinute;
    chatEntryList: ChatEntry[] = [];

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
            .then((chatEntryList: ChatEntry[]) => {
                this.chatEntryList = chatEntryList;
                this.handleDateString();
            })
    }

    /**
     * Due to Typescript limitations, the retrieved date is in fact a string.
     * This function parses each string that represents a Date object into a real Date object.
     */
    private handleDateString() {
        this.chatEntryList.forEach((chatEntry: ChatEntry) => {
            chatEntry.timestamp = new Date(chatEntry.timestamp);
        });
    }
}

export { ChatEntryStore };

const chatEntryStore = new ChatEntryStore();

export default chatEntryStore;