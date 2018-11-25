import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import BlockDetail from '../components/BlockDetail';
import TransactionDetail from '../components/TransactionDetail';
import BlockList from '../components/BlockList';
import TransactionList from '../components/TransactionList';
import './Home.css';
import Confirm from '../components/Confirm';
import { DIALOG, STORAGE } from '../constants';
import Blockchain from '../blockchain/Blockchain';
import Block from '../blockchain/Block';
import Transaction from '../blockchain/Transaction';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chain: [],
      balance: 0,
      pendingTransactions: [],
      completeTransactions: [],
      blockIdSelected: null,
      transactionIdSelected: null,
      dialogTitle: '',
      dialogText: '',
      dialogOpen: DIALOG.CLOSE,
      blockSelected: {
        hash: '',
        previousHash: '',
        transactions: [],
        timestamp: 0
      }
    };

    this.blockchain = null;
  }

  componentDidMount() {
    const difficulty = localStorage.getItem(STORAGE.DIFFICULTY) || 2;
    const chain = JSON.parse(localStorage.getItem(STORAGE.CHAIN)) || [];
    const pendingTransactions = localStorage.getItem(STORAGE.PENDING_TRANSACTIONS) || [];
    const miningReward = 100;

    // Recover chain (blocks and transactions) with REAL classes.
    const chainRecovered = chain.map(block => {
      const { timestamp, transactions, previousHash, nonce, hash } = block;
      const transactionsRecovered = transactions.map(transaction => {
        let transactionRecovered;
        if (transaction.fromAddress === undefined) {
          transactionRecovered = transaction;
        } else {
          const { fromAddress, toAddress, amount, signature } = transaction;
          transactionRecovered = new Transaction(fromAddress, toAddress, amount);
          transactionRecovered.signature = signature;
        }

        return transactionRecovered;
      });

      const blockRecovered = new Block(timestamp, transactionsRecovered, previousHash);
      blockRecovered.nonce = nonce;
      blockRecovered.hash = hash;

      return blockRecovered;
    });
    console.log("TO BLOCKCHAIN", chainRecovered);
    this.blockchain = new Blockchain({difficulty, chain: chainRecovered, pendingTransactions, miningReward});
    const balance = this.blockchain.getBalanceOfAddress(localStorage.getItem(STORAGE.PUBLIC_KEY));
    this.setState({
      balance,
      difficulty,
      chain: this.blockchain.chain, // For the first time with a genesis block.
      pendingTransactions,
    });
  }

  handleBlockSelect = (event, id, some) => {
    console.log(some);
    this.setState({
      blockSelected: this.blockchain.chain[id],
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
    // TODO: promise?
    this.blockchain.minePendingTransactions(localStorage.getItem(STORAGE.PUBLIC_KEY));
    this.setState({
      chain: this.blockchain.chain
    }, () => {
      localStorage.setItem(STORAGE.CHAIN, JSON.stringify(this.blockchain.chain));
    });
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
      chain,
      balance,
      pendingTransactions,
      completeTransactions,
      dialogOpen,
      dialogTitle,
      dialogText,
      blockSelected
    } = this.state;

    return (
      <div className="home">
        <NavBar title="Mini Blockchain" balance={balance} />
        <div className="current-view">
          <BlockList
            title="Blocks"
            chain={chain}
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
          block={blockSelected}
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
