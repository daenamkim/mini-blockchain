import React, { Component } from 'react';
import BlockList from './BlockList';
import TransactionList from './TransactionList';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [],
      pendingTransactions: [],
      completeTransactions: []
    };
  }

  componentDidMount() {
    // TODO:
    const blocks = [
      {
        hash: 'asdlfsdfasd',
        prevHash: 'asdfasdfs',
        time: Date(),
        isValid: 'invalid'
      },
      {
        hash: 'asdfasdfs',
        prevHash: 'asdasdf13fasdfafasdfs',
        time: Date(),
        isValid: 'valid'
      },
      {
        hash: 'asdasdf13fasdfafasdfs',
        prevHash: 'asasf1231231323dfasdfs',
        time: Date(),
        isValid: 'valid'
      },
      {
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
        from: 'asdfasdfsadas',
        to: 'asldfjasfjasdfjsakdfjsalj',
        amount: 200,
        time: Date()
      },
      {
        from: 'asdfasdfsadas',
        to: 'asldfjasfjasdfjsakdfjsalj',
        amount: 12,
        time: Date()
      },
      {
        from: 'asdfasdfsadas',
        to: 'asldfjasfjasdfjsakdfjsalj',
        amount: 33,
        time: Date()
      }
    ];
    const completeTransactions = [
      {
        from: 'asldfjasfjasdfjsakdfjsalj',
        to: 'asdfasdfsadas',
        amount: 55,
        time: Date()
      },
      {
        from: 'asdfasdfsadas',
        to: 'asldfjasfjasdfjsakdfjsalj',
        amount: 12,
        time: Date()
      },
      {
        from: 'asdfasdfsadas',
        to: 'asldfjasfjasdfjsakdfjsalj',
        amount: 200,
        time: Date()
      },
      {
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

  render() {
    const { blocks, pendingTransactions, completeTransactions } = this.state;

    return (
      <div className="dashboard">
        <BlockList
          title="Blocks"
          blocks={blocks}
        />
        <TransactionList
          title="Pending Transactions"
          transactions={pendingTransactions}
          isMutable={true}
        />
        <TransactionList
          title="Complete Transactions"
          transactions={completeTransactions}
          isMutable={false}
        />
      </div>
    );
  }
}

export default Dashboard;
