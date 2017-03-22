import React, { Component } from 'react';
import PeopleList from './components/people_list'
import PersonDetail from './components/person_detail'

class App extends Component {
  render() {
    return (
      <div id="App">
        <div id="App-header">
          <h1>Meet This Person</h1>
          <p>Click a person, and they become the active person</p>
        </div>
        <div id="app-body">
          <PeopleList />
          <PersonDetail />
        </div>
      </div>
    );
  }
}

export default App;
