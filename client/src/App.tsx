import React from 'react';
import ChatLogContext from './contexts/ChatLogContext';
import ChatLogStore from './stores/ChatLogStore';
import { observer } from 'mobx-react-lite';
import { ChatLogList } from './components/chat-log-list/ChatLogList';
import './App.scss';

const App = observer(() => {
  return (
    <div className="App">
      <ChatLogContext.Provider value={ChatLogStore.chatLogList}>
        <ChatLogList></ChatLogList>
      </ChatLogContext.Provider>
    </div>
  );
});

export default App;