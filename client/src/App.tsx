import React from 'react';
import ChatLogContext from './contexts/ChatEntryContext';
import ChatLogStore from './stores/ChatEntryStore';
import { ChatEntryList } from './components/chat-entry-list/ChatEntryList';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <ChatLogContext.Provider value={ChatLogStore}>
        <ChatEntryList></ChatEntryList>
      </ChatLogContext.Provider>
    </div>
  );
};

export default App;