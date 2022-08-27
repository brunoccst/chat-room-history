class APIAgent {
    private path: string = "api";
    
    GetChatLogs = () => fetch("api/GetChatLogs")
}

const apiAgent = new APIAgent();

export default apiAgent;