import { makeAutoObservable } from 'mobx';
import APIAgent from '../agents/APIAgent';
import ChatLog from '../types/ChatLog';

class ChatLogStore {
    chatLogList: ChatLog[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadData();
    }

    /**
     * Loads the chat log data by making an API request and storing it in the state.
     */
    loadData() {
        APIAgent.GetChatLogs()
            .then(async (value: Response) => {
                if (value.ok)
                    return value.json();
                else
                    throw Error(value.statusText);
            })
            .then((chatLogList: ChatLog[]) => {
                this.chatLogList = chatLogList;
                this.handleDateString();
            })
    }

    /**
     * Due to Typescript limitations, the retrieved date is in fact a string.
     * This function parses each string that represents a Date object into a real Date object.
     */
    private handleDateString() {
        this.chatLogList.forEach((chatLog: ChatLog) => {
            chatLog.timestamp = new Date(chatLog.timestamp);
        });
    }
}

const chatLogStore = new ChatLogStore();

export default chatLogStore;