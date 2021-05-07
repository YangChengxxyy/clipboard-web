import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './utils/serviceWorker';
import Index from './pages/index/index'

ReactDOM.render(
  <React.StrictMode>
    <Index title='HelloWord' />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
