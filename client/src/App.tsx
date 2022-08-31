import React from 'react';
import ChatEventContext from 'contexts';
import ChatEventStore from 'stores';
import { ChatEventGroupList } from 'components';
import GithubLink from 'components/github-link';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <ChatEventContext.Provider value={ChatEventStore}>
        <ChatEventGroupList />
      </ChatEventContext.Provider>
      <GithubLink />
    </div>
  );
};

export default App;