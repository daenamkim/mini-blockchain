import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, List, ListItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import logo from '../img/logo.png';
import './SignUp.css';

const styles = {
  forceWidth: {
    width: '100%'
  },
  forceMargin: {
    margin: '0 auto',
    width: 320
  }
}

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
  }

  componentDidMount() {
    console.log("SIGNUP");
  }

  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    });
  };

  handleUsernameSave = event => {
    localStorage.setItem('username', this.state.username);
    this.props.history.replace('/blockchain');
  };


  render() {
    const { username } = this.state;
    const { classes } = this.props;

    return (
      <div className="sign-up">
        <div>
          <img src={logo} alt="Mini Blockchain Logo" />
        </div>
        <List className={classes.forceMargin}>
          <ListItem>
            <TextField
              label="username"
              onChange={this.handleUsernameChange}
              value={username}
              className={classes.forceWidth}
              placeholder="Type more than 6 characters."
            />
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleUsernameSave}
              className={classes.forceWidth}
              disabled={username.length < 6}
            >
              Play Blockchain
            </Button>
          </ListItem>
        </List>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignUp);
