import React, { Component, Fragment } from 'react';
import NavBar from '../components/NavBar';
import Dashboard from '../components/Dashboard';
import BlockDetail from '../components/BlockDetail';
import TransactionDetail from '../components/TransactionDetail';
import { MENU } from '../constants';
import { Route } from 'react-router-dom';

class Blockchain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMenu: MENU.DASHBOARD,
      prevMenu: MENU.NONE
    }
  }

  onBackToPrevMenu = prevMenu => {
    this.setState({
      currentMenu: prevMenu,
      prevMenu: MENU.NONE
    });

    const url = this.props.match.url;
    switch (prevMenu) {
      case MENU.BLOCK_DETAIL:
        this.props.history.replace(`${url}/block-detail/`);
      break;
      case MENU.TRANSACTION_DETAIL:
        this.props.history.replace(`${url}/transaction-detail/`);
      break;
      default:
        this.props.history.replace(`${url}/dashboard/`);
    }
  };

  test = (currentMenu, prevMenu) => {
    this.setState({
      currentMenu,
      prevMenu
    });

    const url = this.props.match.url;
    switch (currentMenu) {
      case MENU.BLOCK_DETAIL:
        this.props.history.replace(`${url}/block-detail/`);
      break;
      case MENU.TRANSACTION_DETAIL:
        this.props.history.replace(`${url}/transaction-detail/`);
      break;
      default:
        this.props.history.replace(`${url}/dashboard/`);
    }
  }

  render() {
    let currentMenuView;
    switch (this.state.currentMenu) {
      case MENU.BLOCK_DETAIL:
      currentMenuView = <BlockDetail />
      break;
      case MENU.TRANSACTION_DETAIL:
      currentMenuView = <TransactionDetail />
      break;
      default:
      currentMenuView = <Dashboard />
    }

    const currentMenu = this.state.currentMenu;
    const prevMenu = this.state.prevMenu;
    const url = this.props.match.url;
    return (
      <div className="blockchain">
        <button onClick={() => {this.test(MENU.DASHBOARD, MENU.NONE)}}>dashboard</button>
        <button onClick={() => {this.test(MENU.BLOCK_DETAIL, MENU.DASHBOARD)}}>blockdetail</button>
        <button onClick={() => {this.test(MENU.TRANSACTION_DETAIL, MENU.DASHBOARD)}}>transactiondetail</button>
        <NavBar currentMenu={currentMenu} prevMenu={prevMenu} backToPrevMenu={this.onBackToPrevMenu} />
        <Route path={`${url}/dashboard/`} component={Dashboard} />
        <Route path={`${url}/block-detail/`} component={BlockDetail} />
        <Route path={`${url}/transaction-detail/`} component={TransactionDetail} />
      </div>
    );
  }
}

export default Blockchain;
