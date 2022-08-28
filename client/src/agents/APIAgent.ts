import TimeInterval from "types/TimeInterval";

class APIAgent {
    private path: string = "api";
    GetChatLogs = () => fetch(`${this.path}/GetChatEntries`)
}

const apiAgent = new APIAgent();

export default apiAgent;