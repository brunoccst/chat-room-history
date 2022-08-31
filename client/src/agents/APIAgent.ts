import { TimeInterval } from "types";

/**
 * Class only responsible for executing HTTP requests to the API, mirroring its functions
 */
class APIAgent {
    private path: string = "api";
    GetChatEventGroups = (timeInterval: TimeInterval) => fetch(`${this.path}/GetChatEventGroups?timeInterval=${timeInterval}`)
}

const apiAgent = new APIAgent();

export default apiAgent;