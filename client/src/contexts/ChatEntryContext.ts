import { createContext } from "react"
import { ChatEntryStore } from 'stores/ChatEntryStore';

const ChatLogContext = createContext<ChatEntryStore>({} as ChatEntryStore);

export default ChatLogContext;