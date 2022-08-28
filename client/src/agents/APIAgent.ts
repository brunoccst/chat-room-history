import TimeInterval from "types/TimeInterval";

class APIAgent {
    private path: string = "api";
    GetChatEntries = (timeInterval: TimeInterval) => fetch(`${this.path}/GetChatEntries?timeInterval=${timeInterval}`)
}

const apiAgent = new APIAgent();

export default apiAgent;