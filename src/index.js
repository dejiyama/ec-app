import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './reducks/store/store'
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as History from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { MuiThemeProvider } from '@material-ui/core';
import {theme} from "./assets/theme"

const history = History.createBrowserHistory()

export const store = createStore(history)

ReactDOM.render(
  //providerでラッピングしてあげることで、appの中（アプリ全体)で使えるようになる。
  <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
