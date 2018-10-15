import React, { Component } from 'react';
import './App.css';
import Agent from './components/agent';
import TGrid from './components/tgrid';
import { agentsList } from './constants';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Agent agentsList={agentsList} />
        </header>
        <article className="App-content">
          <TGrid agentsList={agentsList} />
        </article>
      </div>
    );
  }
}

export default App;
