import React, { Component } from 'react';
import './App.css';
import SignUp from './containers/SignUp';
import Home from './containers/Home';

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
    const username = localStorage.getItem('username');
    const publicKey = localStorage.getItem('publicKey');
    const privateKey = localStorage.getItem('privateKey');

    if (!username) {
      return;
    }

    if (!publicKey || !privateKey)  {
      // TODO: Generate Private Key and Public Key
      localStorage.setItem('publicKey', '1234publickey');
      localStorage.setItem('privateKey', '1234privatekey');
    }

    this.setState({
      username,
      publicKey,
      privateKey
    });
  }

  render() {
    const { username, publicKey, privateKey } = this.state;

    return (
      <div className="app">
        {username && publicKey && privateKey
          ? <Home />
          : <SignUp />
        }
      </div>
    );
  }
}

export default App;
