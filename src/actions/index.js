export const ADD_PENDING_TRANSACTION = 'add_pending_transaction';
export const ADD_BLOCK = 'add_block';

export const addPendingTransaction = transaction => ({
  type: ADD_PENDING_TRANSACTION,
  transaction
});

export const addBlock = block => ({
  type: ADD_BLOCK,
  block
});
