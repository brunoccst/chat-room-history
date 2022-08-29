import TimeInterval from "types/TimeInterval";

/**
 * Class responsible for only executing HTTP requests to the API, mirroring its functions.
 */
class APIAgent {
    private path: string = "api";
    GetChatEntries = (timeInterval: TimeInterval) => fetch(`${this.path}/GetChatEntries?timeInterval=${timeInterval}`)
}

const apiAgent = new APIAgent();

export default apiAgent;