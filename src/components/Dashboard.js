import React from 'react';
import BlockList from './BlockList';
import TransactionList from './TransactionList';
import './Dashboard.css';

const Dashboard = () => (
  <div className="dashboard">
    <BlockList title="Blocks" />
    <TransactionList title="Pending Transactions" />
    <TransactionList title="Complete Transactions" />
  </div>
);

export default Dashboard;
