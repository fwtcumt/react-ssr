import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const req = require.context('../client/pages', true, /redux\.jsx?$/);
const allReducers = [].concat.apply([], req.keys().map(k => req(k).redux || []));
const reducerCof = {};

allReducers.forEach(red => {
  reducerCof[red.stateKey] = red.reducer;
});

const reducer = combineReducers(reducerCof);

export default (defualtState = {}) => {
  return createStore(reducer, defualtState, applyMiddleware(thunk));
}