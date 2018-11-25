import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import BlockDetail from '../components/BlockDetail';
import TransactionDetail from '../components/TransactionDetail';
import BlockList from '../components/BlockList';
import TransactionList from '../components/TransactionList';
import './Home.css';
import Confirm from '../components/Confirm';
import { DIALOG } from '../constants';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [],
      coins: 'TODO: 200',
      pendingTransactions: [],
      completeTransactions: [],
      blockIdSelected: null,
      transactionIdSelected: null,
      dialogTitle: '',
      dialogText: '',
      dialogOpen: DIALOG.CLOSE,
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

  handleBlockSelect = id => {
    console.log("SELECT", id);
    this.setState({
      blockIdSelected: id,
      dialogOpen: DIALOG.BLOCK_DETAIL
    });
  };

  handleBlockDetailClose = () => {
    this.setState({
      dialogOpen: DIALOG.CLOSE
    });
  };

  handleBlockDelete = id => {
    this.setState({
      dialogOpen: DIALOG.CONFIRM,
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
      transactionIdSelected: id,
      dialogOpen: DIALOG.TRANSACTION_DETAIL
    });
  };

  handleTransactionDelete = id => {
    this.setState({
      dialogOpen: DIALOG.CONFIRM,
      transactionIdSelected: id,
      dialogTitle: "Delete A Transaction",
      dialogText: "This transaction will not be stored into the next block. Are you sure?"
    });
  };

  handleTransactionCreate = () => {
    this.setState({
      dialogTitle: 'New Transaction',
      dialogOpen: DIALOG.NEW_TRANSACTION
    });
  };

  handleTransactionDetailClose = (something) => {
    console.log(something);
    this.setState({
      dialogOpen: DIALOG.CLOSE
    });
  };

  handleConfirmClose = select => {
    console.log(select);
    this.setState({
      dialogOpen: DIALOG.CLOSE
    });
  };

  render() {
    const {
      blocks,
      coins,
      pendingTransactions,
      completeTransactions,
      dialogOpen,
      dialogTitle,
      dialogText,
    } = this.state;

    return (
      <div className="home">
        <NavBar title="Mini Blockchain" coins={coins} />
        <div className="current-view">
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
        </div>
        <Confirm
          title={dialogTitle}
          text={dialogText}
          open={dialogOpen === DIALOG.CONFIRM}
          onClose={this.handleConfirmClose}
        />
        <TransactionDetail
          title="New Transaction"
          open={dialogOpen === DIALOG.NEW_TRANSACTION}
          onClose={this.handleTransactionDetailClose}
        />
        <BlockDetail
          title="Block Detail"
          open={dialogOpen === DIALOG.BLOCK_DETAIL}
          onClose={this.handleBlockDetailClose}
        />
        <TransactionDetail
          title="Transaction Detail"
          open={dialogOpen === DIALOG.TRANSACTION_DETAIL}
          onClose={this.handleTransactionDetailClose}
        />
      </div>
    );
  }
}

export default Home;
