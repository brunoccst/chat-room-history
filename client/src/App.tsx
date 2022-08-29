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
      <a href="https://github.com/brunoccst/chat-room-history">
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className='github-icon' alt="GitHub icon" />
        <div>chat-room-history</div>
      </a>
    </div>
  );
};

export default App;