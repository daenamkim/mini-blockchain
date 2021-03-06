import SHA256 from 'crypto-js/sha256';
import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.signature = '';
    // TODO: add time
  }

  calculateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  }

  signTransaction(signingKey) {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw Error('You cannot sign transaction for other wallets!');
    }

    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, 'base64');
    this.signature = sig.toDER('hex');
  }

  isValid() {
    // For reward.
    if (this.fromAddress === null) {
      return true;
    }

    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction.');
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

export default Transaction;
