import { createContext } from "react"
import { ChatLogStore } from '../stores/ChatLogStore';

const ChatLogContext = createContext<ChatLogStore>({} as ChatLogStore);

export default ChatLogContext;