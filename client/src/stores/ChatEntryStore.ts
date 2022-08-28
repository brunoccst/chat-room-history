import { makeAutoObservable } from 'mobx';
import TimeInterval from 'types/TimeInterval';
import APIAgent from '../agents/APIAgent';
import ChatEntry from '../types/ChatEntry';

class ChatEntryStore {
    chatEntryList: ChatEntry[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadData(TimeInterval.MinuteByMinute);
    }

    /**
     * Loads the chat entry data by making an API request and storing it in the state.
     */
    loadData(timeInterval: TimeInterval) {
        APIAgent.GetChatEntrys(timeInterval)
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