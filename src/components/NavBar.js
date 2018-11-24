import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { ArrowBack, Info } from '@material-ui/icons';
import { MENU } from '../constants';
import DialogUserInfo from './DialogUserInfo';

const styles = {
  grow: {
    flexGrow: 1,
    textAlign: 'left',
    marginLeft: 10
  }
};

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      infoDialogOpen: false
    }
  }

  handleDialogUserInfoOpen = () => {
    this.setState({
      infoDialogOpen: true
    });
  };

  handleDialogUserInfoClose = () => {
    this.setState({
      infoDialogOpen: false
    });
  };

  render() {
    const { currentMenu, prevMenu, onBackToMenu, classes } = this.props;
    const { infoDialogOpen: open } = this.state;

    const userInfo = {
      username: localStorage.getItem('username'),
      publicKey: localStorage.getItem('publicKey'),
      privateKey: localStorage.getItem('privateKey')
    };
    return (
      <div className="nav-bar">
        <AppBar position="static" color="primary">
          <Toolbar>
            {prevMenu !== MENU.NONE
              ? <Button color="inherit" onClick={() => {onBackToMenu(prevMenu)}}>
                <ArrowBack></ArrowBack>
                {prevMenu}
              </Button>
              : null
            }
            <Typography variant="h6" color="inherit" className={classes.grow}>{currentMenu}</Typography>
            <IconButton color="inherit" onClick={this.handleDialogUserInfoOpen}>
              <Info />
            </IconButton>
          </Toolbar>
          <DialogUserInfo
            title="User Information"
            open={open}
            onClose={this.handleDialogUserInfoClose}
            info={userInfo}
          />
        </AppBar>
      </div>
    );
  }
}

NavBar.protoType = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
