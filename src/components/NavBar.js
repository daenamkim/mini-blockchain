import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { MENU } from '../constants';

const NavBar = ({ currentMenu, prevMenu, backToPrevMenu }) => (
  <div>
    <AppBar position="static" color="primary">
      <Toolbar>
        {prevMenu !== MENU.NONE
          ? <Button color="inherit" onClick={() => {backToPrevMenu(prevMenu)}}>
            <ArrowBack></ArrowBack>
            {prevMenu}
          </Button>
          : null
        }
        <Typography variant="h6" color="inherit">{currentMenu}</Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default NavBar;
