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
import { withSnackbar } from 'notistack';

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
      isMining: false,
      dialogTitle: '',
      dialogText: '',
      dialogOpen: DIALOG.CLOSE,
      difficulty: 2,
      blockSelected: {
        hash: '',
        previousHash: '',
        transactions: [],
        timestamp: 0
      },
      transactionSelected: {
        fromAddress: '',
        toAddress: '',
        amount: 0,
        timestamp: 0
      }
    };

    this.blockchain = null;
  }

  componentDidMount() {
    const difficulty = localStorage.getItem(STORAGE.DIFFICULTY) || 2;
    const chain = JSON.parse(localStorage.getItem(STORAGE.CHAIN)) || [];
    const pendingTransactions = JSON.parse(localStorage.getItem(STORAGE.PENDING_TRANSACTIONS)) || [];
    const miningReward = 100;

    // Restore chain (blocks and transactions) with REAL classes.
    const pendingTransactionsRestored = pendingTransactions.map(pendingTransaction => {
      let pendingTransactionsRestored;
      const { fromAddress, toAddress, amount, signature } = pendingTransaction;
      pendingTransactionsRestored = new Transaction(fromAddress, toAddress, amount);
      pendingTransactionsRestored.signature = signature;
      return pendingTransactionsRestored;
    });

    const chainRestored = chain.map(block => {
      const { timestamp, transactions, previousHash, nonce, hash } = block;
      const transactionsRestored = transactions.map(transaction => {
        let transactionRestored;
        if (transaction.fromAddress === undefined) {
          // For genesis block.
          transactionRestored = transaction;
        } else {
          const { fromAddress, toAddress, amount, signature } = transaction;
          transactionRestored = new Transaction(fromAddress, toAddress, amount);
          transactionRestored.signature = signature;
        }

        return transactionRestored;
      });

      const blockRestored = new Block(timestamp, transactionsRestored, previousHash);
      blockRestored.nonce = nonce;
      blockRestored.hash = hash;

      return blockRestored;
    });

    this.blockchain = new Blockchain({
      difficulty,
      chain: chainRestored,
      pendingTransactions: pendingTransactionsRestored,
      miningReward
    });
    const balance = this.blockchain.getBalanceOfAddress(localStorage.getItem(STORAGE.PUBLIC_KEY));
    this.setState({
      balance,
      difficulty,
      chain: this.blockchain.chain, // For the first time with a genesis block.
      pendingTransactions: pendingTransactionsRestored,
      completeTransactions: this.blockchain.getCompleteTransactions()
    });
  }

  handleBlockSelect = ({ id }) => {
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

  handleBlockCreate = async () => {
    this.setState({
      isMining: true
    });
    // Wait until applying an animation before mining starts.
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });

    const { enqueueSnackbar } = this.props;
    this.blockchain.minePendingTransactions(localStorage.getItem(STORAGE.PUBLIC_KEY));
    this.setState({
      pendingTransactions: this.blockchain.pendingTransactions,
      completeTransactions: this.blockchain.getCompleteTransactions(),
      balance: this.blockchain.getBalanceOfAddress(localStorage.getItem(STORAGE.PUBLIC_KEY)),
      chain: this.blockchain.chain,
      isMining: false
    }, () => {
      localStorage.setItem(STORAGE.CHAIN, JSON.stringify(this.blockchain.chain));
      localStorage.setItem(STORAGE.PENDING_TRANSACTIONS, JSON.stringify([]));
      enqueueSnackbar('Block successfully mined!', {variant: 'success'});
    });
  };

  handleDifficultyChange = ({ difficulty }) => {
    this.blockchain.difficulty = difficulty;
    this.setState({
      difficulty
    }, () => localStorage.setItem(STORAGE.DIFFICULTY, difficulty));
  };

  handleTransactionSelect = ({ id, type }) => {
    console.log(id, this.state.completeTransactions, this.state.completeTransactions[id])
    if (type === 'pending') {
      this.setState({
        transactionSelected: this.state.pendingTransactions[id],
        dialogOpen: DIALOG.TRANSACTION_DETAIL
      });
    } else if (type === 'complete') {
      this.setState({
        transactionSelected: this.state.completeTransactions[id],
        dialogOpen: DIALOG.TRANSACTION_DETAIL
      });
    }
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

  handleTransactionDetailClose = (event, type, transaction) => {
    switch (type) {
      case 'create':
        const newTransaction = new Transaction(transaction.fromAddress, transaction.toAddress, transaction.amount);
        this.blockchain.pendingTransactions = [...this.blockchain.pendingTransactions, newTransaction];
        this.setState({
          pendingTransactions: this.blockchain.pendingTransactions,
          dialogOpen: DIALOG.CLOSE
        });
        localStorage.setItem(STORAGE.PENDING_TRANSACTIONS, JSON.stringify(this.blockchain.pendingTransactions));
        break;
      default:
        this.setState({
          dialogOpen: DIALOG.CLOSE
        });
    }

  };

  handleConfirmClose = ({ type }) => {
    console.log(type);
    this.setState({
      dialogOpen: DIALOG.CLOSE
    });
  };

  handleBlocksDelete = () => {
    this.blockchain.chain = this.blockchain.chain.slice(0, 1);
    localStorage.setItem(STORAGE.CHAIN, JSON.stringify(this.blockchain.chain));

    this.setState({
      chain: this.blockchain.chain,
      balance: 0,
      completeTransactions: this.blockchain.getCompleteTransactions(),
      blockIdSelected: null,
      transactionIdSelected: null,
      blockSelected: {
        hash: '',
        previousHash: '',
        transactions: [],
        timestamp: 0
      },
      transactionSelected: {
        fromAddress: '',
        toAddress: '',
        amount: 0,
        timestamp: 0
      }
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
      blockSelected,
      transactionSelected,
      difficulty,
      isMining
    } = this.state;

    return (
      <div className="home">
        <NavBar
          title="Mini Blockchain"
          balance={balance}
          difficulty={parseInt(difficulty)}
          onDeleteBlocks={this.handleBlocksDelete}
          onChangeDifficulty={this.handleDifficultyChange}
        />
        <div className="current-view">
          <TransactionList
            title="Pending Transactions"
            transactions={pendingTransactions}
            isPendingList={true}
            onSelectTransaction={this.handleTransactionSelect}
            onDeleteTransaction={this.handleTransactionDelete}
            onCreateTransaction={this.handleTransactionCreate}
          />
          <BlockList
            title="Blocks"
            chain={chain}
            onSelectBlock={this.handleBlockSelect}
            onDeleteBlock={this.handleBlockDelete}
            onCreateBlock={this.handleBlockCreate}
            isMining={isMining}
          />
          <TransactionList
            title="Complete Transactions"
            transactions={completeTransactions}
            isPendingList={false}
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
          isEditable={true}
          fromAddress={localStorage.getItem(STORAGE.PUBLIC_KEY)}
          open={dialogOpen === DIALOG.NEW_TRANSACTION}
          onClose={this.handleTransactionDetailClose}
          transaction={{}}
        />
        <BlockDetail
          title="Block Detail"
          isEditable={false}
          block={blockSelected}
          open={dialogOpen === DIALOG.BLOCK_DETAIL}
          onClose={this.handleBlockDetailClose}
        />
        <TransactionDetail
          title="Transaction Detail"
          isEditable={false}
          open={dialogOpen === DIALOG.TRANSACTION_DETAIL}
          onClose={this.handleTransactionDetailClose}
          transaction={transactionSelected}
        />
      </div>
    );
  }
}

export default withSnackbar(Home);
