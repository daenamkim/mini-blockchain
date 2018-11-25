import React, { Component } from 'react';
import './App.css';
import SignUp from './containers/SignUp';
import Home from './containers/Home';
import { generateKeyPair } from './utils';
import { STORAGE } from './constants';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      publicKey: '',
      privateKey: ''
    };
  }

  componentDidMount() {
    const username = localStorage.getItem(STORAGE.USERNAME);
    const publicKey = localStorage.getItem(STORAGE.PUBLIC_KEY);
    const privateKey = localStorage.getItem(STORAGE.PRIVATE_KEY);

    if (!username || !publicKey || !privateKey)  {
      return;
    }

    this.setState({
      username,
      publicKey,
      privateKey
    });
  }

  handleUsernameAdd = (event, username) => {
    const keyPair = generateKeyPair();
    localStorage.setItem(STORAGE.USERNAME, username);
    localStorage.setItem(STORAGE.PUBLIC_KEY, keyPair.publicKey);
    localStorage.setItem(STORAGE.PRIVATE_KEY, keyPair.privateKey);
    this.setState({
      username,
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey
    });
  };

  render() {
    const { username, publicKey, privateKey } = this.state;

    return (
      <div className="app">
        {username && publicKey && privateKey
          ? <Home />
          : <SignUp onAddUsername={this.handleUsernameAdd} />
        }
      </div>
    );
  }
}

export default App;
