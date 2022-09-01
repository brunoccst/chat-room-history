import React from 'react';
import ChatEventContext from 'contexts';
import ChatEventStore from 'stores';
import { ChatEventGroupList, GithubLink, LanguageSelector } from 'components';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <ChatEventContext.Provider value={ChatEventStore}>
        <ChatEventGroupList />
      </ChatEventContext.Provider>
      <LanguageSelector />
      <GithubLink />
    </div>
  );
};

export default App;