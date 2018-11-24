import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Home from './containers/Home';
import Blockchain from './containers/Blockchain';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    // TODO: user name check and if no then show input
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Link to="/home">Home</Link>
          <Link to="/blockchain">Blockchain</Link>
          {/* <Home />
          <Blockchain /> */}
          <Route path="/home" component={Home} />
          <Route path="/blockchain" component={Blockchain} />
        </div>
      </Router>
    );
  }
}

export default App;
