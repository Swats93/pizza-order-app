import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';

import size from 'modules/size';
import toppings from 'modules/toppings';
import checkout from 'modules/checkout';


const rootReducer = combineReducers({
  size,
  toppings,
  checkout
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
