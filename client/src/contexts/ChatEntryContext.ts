import { createContext } from "react"
import { ChatEntryStore } from 'stores';

const ChatLogContext = createContext<ChatEntryStore>({} as ChatEntryStore);

export default ChatLogContext;