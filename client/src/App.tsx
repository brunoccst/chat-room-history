import React from 'react';
import ChatLogContext from './contexts/ChatLogContext';
import { ChatLogList } from './components/chat-log-list/ChatLogList';
import './App.css';
import ChatLogStore from './stores/ChatLogStore';

const App = () => {
  return (
    <div className="App">
      <ChatLogContext.Provider value={ChatLogStore.chatLogList}>
        <ChatLogList></ChatLogList>
      </ChatLogContext.Provider>
    </div>
  );
};

export default App;
