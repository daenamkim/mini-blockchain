const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = '';
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/10/2018", "Genesis Block. Yay!!", "0");
  }

  geLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.geLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
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

let daenamCoin = new Blockchain();
daenamCoin.addBlock(new Block(1, "06/11/2018", {amount: 4}));
daenamCoin.addBlock(new Block(2, "07/11/2018", {amount: 10}));
// Show the chain.
console.log(JSON.stringify(daenamCoin, null, 4));
console.log('Is blockchain valid? ' + daenamCoin.isChainValid());
// Current hash will be broken.
daenamCoin.chain[1].data = { amount: 100 };
console.log('Is blockchain valid? ' + daenamCoin.isChainValid());

// Relationship with a previous block will be broken.
daenamCoin.chain[1].hash = daenamCoin.chain[1].calculateHash();
console.log('Is blockchain valid? ' + daenamCoin.isChainValid());
