const SHA256 = require('crypto-js/sha256');

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = '';
    this.nonce = 0; // To create a new hash according to a difficulty.
  }

  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    // Find a hash which has 0 of the length of the difficulty.
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;  // 100 coins!!!
  }

  createGenesisBlock() {
    return new Block("01/10/2018", "Genesis Block. Yay!!", "0");
  }

  geLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // DEPRECATED
  addBlock(newBlock) {
    newBlock.previousHash = this.geLatestBlock().hash;
    // newBlock.hash = newBlock.calculateHash();
    newBlock.hash = newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  minePendingTransactions(miningRewardAddress) {
    // TODO: what about previous hash?
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log('Block successfully mined!');
    this.chain.push(block);

    // Give a reward!
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  createTransaction(transaction) {
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

  isChainValid() {
    // Skip for the genesis block.
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

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

let butterCoin = new Blockchain();
butterCoin.createTransaction(new Transaction('address1', 'address2', 100));
butterCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\nStarting the miner...');
butterCoin.minePendingTransactions('daenam-address');
console.log('\nBalance of daenam is ', butterCoin.getBalanceOfAddress('daenam-address'));
// til here is my balance is zero because rewarded transactions is pended.

console.log('\nStarting the miner again...');
butterCoin.minePendingTransactions('daenam-address');
console.log('\nBalance of daenam is ', butterCoin.getBalanceOfAddress('daenam-address'));

console.log(butterCoin.pendingTransactions);
console.log(butterCoin.chain);
