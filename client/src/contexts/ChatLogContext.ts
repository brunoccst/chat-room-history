import { createContext, useContext } from "react"
import ChatLog from '../types/ChatLog';

const ChatLogContext = createContext<ChatLog[]>([]);

export default ChatLogContext;