class APIAgent {
    private path: string = "api";
    GetChatLogs = () => fetch(`${this.path}/GetChatLogs`)
}

const apiAgent = new APIAgent();

export default apiAgent;