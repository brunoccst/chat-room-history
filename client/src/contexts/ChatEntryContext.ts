import { createContext } from "react"
import { ChatEntryStore } from "stores/ChatEntryStore";

const ChatEntryContext = createContext<ChatEntryStore>({} as ChatEntryStore);

export default ChatEntryContext;