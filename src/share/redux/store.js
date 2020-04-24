import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

import middleWare1 from './middleWare1';
import middleWare2 from './middleWare2';

export default (defualtState = {}) => {
  return createStore(reducer, defualtState, applyMiddleware(thunk, middleWare1, middleWare2));
}