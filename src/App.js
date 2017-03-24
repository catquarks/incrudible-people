import React, { Component } from 'react';
import PeopleList from './components/people_list'
import PersonDetail from './components/person_detail'
import NewPerson from './components/new_person'

class App extends Component {
  render() {
    return (
      <div id="App">
        <div id="App-header">
          <h1>in<strong>CRUD</strong>ible People</h1>
          <p>An app for <strong>C</strong>reating, <strong>R</strong>eading, <strong>U</strong>pdating, and <strong>D</strong>estroying truly in<strong>CRUD</strong>ible people!</p>
        </div>
        <div id="app-body">
          <PeopleList />
          <PersonDetail />
          <NewPerson />
        </div>
      </div>
    );
  }
}

export default App;
