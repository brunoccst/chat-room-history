import React from 'react';
import ChatEntryContext from './contexts/ChatEntryContext';
import ChatEntryStore from './stores/ChatEntryStore';
import { observer } from 'mobx-react-lite';
import { ChatEntryList } from './components/chat-entry-list/ChatEntryList';
import './App.scss';

const App = observer(() => {
  return (
    <div className="App">
      <ChatEntryContext.Provider value={ChatEntryStore}>
        <ChatEntryList></ChatEntryList>
      </ChatEntryContext.Provider>
    </div>
  );
});

export default App;
