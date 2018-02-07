import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from 'store';
import 'index.css'
import 'assets/style/tachyons.min.css';

import Size from 'pages/Size';
import Toppings from 'pages/Toppings';
import Checkout from 'pages/Checkout';

const App = () => (
  <BrowserRouter>
      <Provider store={store}>
        <div>
          <Route exact path='/' component={Size} />
          <Route exact path='/toppings' component={Toppings} />
          <Route exact path='/checkout' component={Checkout} />
        </div>
      </Provider>
  </BrowserRouter>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
