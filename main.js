const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = '';
    this.nonce = 0; // To create a new hash according to a difficulty.
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock() {
    return new Block(0, "01/10/2018", "Genesis Block. Yay!!", "0");
  }

  geLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.geLatestBlock().hash;
    // newBlock.hash = newBlock.calculateHash();
    newBlock.hash = newBlock.mineBlock(this.difficulty);
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

console.log("Mining block 1...");
daenamCoin.addBlock(new Block(1, "06/11/2018", {amount: 4}));
console.log("Mining block 2...");
daenamCoin.addBlock(new Block(2, "07/11/2018", {amount: 10}));


// daenamCoin.addBlock(new Block(1, "06/11/2018", {amount: 4}));
// daenamCoin.addBlock(new Block(2, "07/11/2018", {amount: 10}));
// // Show the chain.
// console.log(JSON.stringify(daenamCoin, null, 4));
// console.log('Is blockchain valid? ' + daenamCoin.isChainValid());
// // Current hash will be broken.
// daenamCoin.chain[1].data = { amount: 100 };
// console.log('Is blockchain valid? ' + daenamCoin.isChainValid());

// // Relationship with a previous block will be broken.
// daenamCoin.chain[1].hash = daenamCoin.chain[1].calculateHash();
// console.log('Is blockchain valid? ' + daenamCoin.isChainValid());
