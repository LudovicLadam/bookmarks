import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import './client/css/style.css';
import './client/css/fonts.css'
import Router from './client/Router';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './client/reducers'

const store = createStore(rootReducer)

render((
  <Provider store={store}>
    <Router />
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
