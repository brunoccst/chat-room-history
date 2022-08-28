import React from 'react';
import ChatLogContext from './contexts/ChatLogContext';
import ChatLogStore from './stores/ChatLogStore';
import { ChatLogList } from './components/chat-log-list/ChatLogList';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <ChatLogContext.Provider value={ChatLogStore}>
        <ChatLogList></ChatLogList>
      </ChatLogContext.Provider>
    </div>
  );
};

export default App;