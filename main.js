const Blockchain = require('./class/Blockchain');
const Transaction = require('./class/Transaction');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('5c78dabfd4a819f070582da0ded148542eccee16938ec8acc15b40d9199e8de3');
const myWalletAddress = myKey.getPublic('hex');

let butterCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'PUBLIC KEY GOES HERE FOR TO', 10);
tx1.signTransaction(myKey);
butterCoin.addTransaction(tx1);

console.log('\nStarting the miner...');
butterCoin.minePendingTransactions(myWalletAddress);
console.log('\nBalance of daenam is ', butterCoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain valid?', butterCoin.isChainValid());
// til here is my balance is zero because rewarded transactions is pended.

// console.log('\nStarting the miner again...');
// butterCoin.minePendingTransactions(myWalletAddress);
// console.log('\nBalance of daenam is ', butterCoin.getBalanceOfAddress(myWalletAddress));

console.log(butterCoin.chain[1].transactions);
