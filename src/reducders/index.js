import { combineReducers } from 'redux';
import blocks from 'blocks';
import pendingTransactions from 'pendingTransactions';

export default combineReducers({
  blocks,
  pendingTransactions
});
