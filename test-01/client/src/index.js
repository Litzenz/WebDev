import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { getStore } from './redux';
import { Provider } from 'react-redux';

const myStore = getStore();

ReactDOM.render((
  <Provider store={myStore}>
    <App />
  </Provider>
),
  document.getElementById('root')
);