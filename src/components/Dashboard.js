import React from 'react';
import BlockList from './BlockList';
import TransactionList from './TransactionList';
import './Dashboard.css';

const Dashboard = () => (
  <div className="dashboard">
    <BlockList />
    <TransactionList />
  </div>
);

export default Dashboard;
