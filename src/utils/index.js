import { ec as EC } from 'elliptic';

export const generateKeyPair = () => {
  const ec = new EC('secp256k1');
  const key = ec.genKeyPair();
  const publicKey = key.getPublic('hex');
  const privateKey = key.getPrivate('hex');
  return {
    publicKey,
    privateKey
  };
};

