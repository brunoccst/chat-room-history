import TimeInterval from "types/TimeInterval";

class APIAgent {
    private path: string = "api";
    GetChatLogs = (timeInterval: TimeInterval) => fetch(`${this.path}/GetChatEntries?timeInterval=${timeInterval}`)
}

const apiAgent = new APIAgent();

export default apiAgent;