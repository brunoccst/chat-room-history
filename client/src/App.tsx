import React from 'react';
import ChatEventContext from 'contexts';
import ChatEventStore from 'stores';
import { ChatEventGroupList } from 'components';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <ChatEventContext.Provider value={ChatEventStore}>
        <ChatEventGroupList />
      </ChatEventContext.Provider>
      <a href="https://github.com/brunoccst/chat-room-history">
        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className='github-icon' alt="GitHub icon" />
        <div>chat-room-history</div>
      </a>
    </div>
  );
};

export default App;