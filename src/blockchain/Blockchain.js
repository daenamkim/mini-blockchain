import Block from './Block';
import Transaction from './Transaction';

class Blockchain {
  constructor({ chain, difficulty, pendingTransactions, miningReward }) {
    this.chain = chain.length < 1 ? [this.createGenesisBlock()] : chain;
    this.difficulty = difficulty;
    this.pendingTransactions = pendingTransactions;
    this.miningReward = miningReward;
  }

  createGenesisBlock() {
    return new Block(Date.parse('2018-10-01'), ['Genesis Block. Yay!!']);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
    this.pendingTransactions.push(rewardTx);

    let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
    block.mineBlock(this.difficulty);

    console.log('Block successfully mined!');
    this.chain.push(block);

    this.pendingTransactions = [];
  }

  addTransaction(transaction) {
    console.log("Transaction");
    // TODO: rewarded transaction doesn't have fromAddress. is it ok?
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('Transaction must include from and to address');
    }

    if (!transaction.isValid()) {
      throw new Error('Cannot add invalid transaction to chain');
    }

    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  getCompleteTransactions() {
    // TODO: can be performance issue?
    const transactions = [];

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        transactions.push(trans);
      }
    }

    return transactions;
  }

  isChainValid() {
    // Skip for the genesis block.
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!currentBlock.hasValidTransaction()) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

export default Blockchain;
