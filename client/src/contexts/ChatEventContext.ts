import { createContext } from "react"
import chatEventStore, { ChatEventStore } from 'stores';

const ChatEventContext = createContext<ChatEventStore>(chatEventStore);

export default ChatEventContext;