import React, { Component, Fragment } from 'react';
import NavBar from '../components/NavBar';
import BlockDetail from '../components/BlockDetail';
import TransactionDetail from '../components/TransactionDetail';
import { MENU } from '../constants';
import BlockList from '../components/BlockList';
import TransactionList from '../components/TransactionList';
import './Home.css';
import DialogConfirm from '../components/DialogConfirm';
import DialogTransaction from '../components/DialogTransaction';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMenu: MENU.HOME,
      prevMenu: MENU.NONE,
      blocks: [],
      pendingTransactions: [],
      completeTransactions: [],
      blockIdSelected: null,
      transactionIdSelected: null,
      dialogTitle: '',
      dialogText: '',
      dialogOpen: false,
      dialogTxTitle: '',
      dialogTxOpen: false
    }
  }

  componentDidMount() {
    const blocks = [
      {
        id: '1231',
        hash: 'asdlfsdfasd',
        prevHash: 'asdfasdfs',
        time: Date(),
        isValid: 'invalid'
      },
      {
        id: '1231',
        hash: 'asdfasdfs',
        prevHash: 'asdasdf13fasdfafasdfs',
        time: Date(),
        isValid: 'valid'
      },
      {
        id: '1231',
        hash: 'asdasdf13fasdfafasdfs',
        prevHash: 'asasf1231231323dfasdfs',
        time: Date(),
        isValid: 'valid'
      },
      {
        id: '1231',
        hash: 'asasf1231231323dfasdfs',
        prevHash: 'asd12312312313123139876trfasdfs',
        time: Date(),
        isValid: 'valid'
      },
      {
        hash: 'asd12312312313123139876trfasdfs',
        prevHash: 'asdfasdfassadfasfasdfsaasdfs',
        time: Date(),
        isValid: 'valid'
      }
    ];
    const pendingTransactions = [
      {
        id: '1231',
        from: 'asdfasdfsadas',
        to: 'asldfjasfjasdfjsakdfjsalj',
        amount: 200,
        time: Date()
      },
      {
        id: '1231',
        from: 'asdfasdfsadas',
        to: 'asldfjasfjasdfjsakdfjsalj',
        amount: 12,
        time: Date()
      },
      {
        id: '1231',
        from: 'asdfasdfsadas',
        to: 'asldfjasfjasdfjsakdfjsalj',
        amount: 33,
        time: Date()
      }
    ];
    const completeTransactions = [
      {
        id: '1231',
        from: 'asldfjasfjasdfjsakdfjsalj',
        to: 'asdfasdfsadas',
        amount: 55,
        time: Date()
      },
      {
        id: '1231',
        from: 'asdfasdfsadas',
        to: 'asldfjasfjasdfjsakdfjsalj',
        amount: 12,
        time: Date()
      },
      {
        id: '1231',
        from: 'asdfasdfsadas',
        to: 'asldfjasfjasdfjsakdfjsalj',
        amount: 200,
        time: Date()
      },
      {
        id: '1231',
        from: 'asdfasdfsadas',
        to: 'asldfjasfjasdfjsakdfjsalj',
        amount: 33,
        time: Date()
      }
    ];
    this.setState({
      blocks,
      pendingTransactions,
      completeTransactions
    });
  }

  handleMenuBack = prevMenu => {
    this.setState({
      currentMenu: prevMenu,
      prevMenu: MENU.NONE
    });
  };

  handleBlockSelect = id => {
    console.log("SELECT", id);
    this.setState({
      prevMenu: MENU.HOME,
      currentMenu: MENU.BLOCK_DETAIL,
      blockIdSelected: id
    });
  };

  handleBlockDelete = id => {
    this.setState({
      dialogOpen: true,
      blockIdSelected: id,
      dialogTitle: "Delete A Block",
      dialogText: "All blocks will be removed from where you want to delete. Are you sure?"
    });
  };

  handleBlockCreate = () => {
    console.log("TODO: block create");
  };

  handleBlockCancel = () => {
    console.log("TODO: block cancel");
  };

  handleTransactionSelect = id => {
    this.setState({
      prevMenu: MENU.HOME,
      currentMenu: MENU.TRANSACTION_DETAIL,
      transactionIdSelected: id
    });
  };

  handleTransactionDelete = id => {
    this.setState({
      dialogOpen: true,
      transactionIdSelected: id,
      dialogTitle: "Delete A Transaction",
      dialogText: "This transaction will not be stored into the next block. Are you sure?"
    });
  };

  handleTransactionCreate = () => {
    this.setState({
      dialogTxTitle: 'New Transaction',
      dialogTxOpen: true
    });
  };

  handleDialogTransactionClose = (something) => {
    console.log(something);
    this.setState({
      dialogTxOpen: false
    });
  };

  handleDialogConfirmClose = select => {
    console.log(select);
    this.setState({
      dialogOpen: false
    });
  };

  render() {
    const {
      blocks,
      pendingTransactions,
      completeTransactions,
      dialogOpen,
      dialogTitle,
      dialogText,
      blockIdSelected,
      transactionIdSelected,
      dialogTxOpen,
      dialogTxTitle
    } = this.state;

    let currentMenuView;
    switch (this.state.currentMenu) {
      case MENU.BLOCK_DETAIL:
        currentMenuView = <BlockDetail id={blockIdSelected} />
        break;
      case MENU.TRANSACTION_DETAIL:
        currentMenuView = <TransactionDetail id={transactionIdSelected} />
        break;
      default:
        currentMenuView = <Fragment>
          <BlockList
            title="Blocks"
            blocks={blocks}
            onSelectBlock={this.handleBlockSelect}
            onDeleteBlock={this.handleBlockDelete}
            onCancelBlock={this.handleBlockCancel}
            onCreateBlock={this.handleBlockCreate}
          />
          <TransactionList
            title="Pending Transactions"
            transactions={pendingTransactions}
            isMutable={true}
            onSelectTransaction={this.handleTransactionSelect}
            onDeleteTransaction={this.handleTransactionDelete}
            onCreateTransaction={this.handleTransactionCreate}
          />
          <TransactionList
            title="Complete Transactions"
            transactions={completeTransactions}
            isMutable={false}
            onSelectTransaction={this.handleTransactionSelect}
          />
        </Fragment>
    }

    const currentMenu = this.state.currentMenu;
    const prevMenu = this.state.prevMenu;
    return (
      <div className="home">
        <NavBar currentMenu={currentMenu} prevMenu={prevMenu} onBackToMenu={this.handleMenuBack} />
        <div className="current-view">
          {currentMenuView}
        </div>
        <DialogConfirm
          title={dialogTitle}
          text={dialogText}
          open={dialogOpen}
          onClose={this.handleDialogConfirmClose}
        />
        <DialogTransaction
          title={dialogTxTitle}
          open={dialogTxOpen}
          onClose={this.handleDialogTransactionClose}
        />
      </div>
    );
  }
}

export default Home;
