import { makeAutoObservable } from 'mobx';
import APIAgent from '../agents/APIAgent';
import ChatLog from '../types/ChatLog';

class ChatLogStore {
    chatLogList: ChatLog[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadChatLogStore();
    }

    private loadChatLogStore() {
        APIAgent.GetChatLogs()
            .then(async (value: Response) => {
                console.log(await value.text());
                if (value.ok)
                    return value.json();
                else
                    throw Error(value.statusText);
            })
            .then((chatLogList: ChatLog[]) => {
                console.log(chatLogList);
                this.chatLogList = chatLogList;
            })
    }
}

const chatLogStore = new ChatLogStore();

export default chatLogStore;