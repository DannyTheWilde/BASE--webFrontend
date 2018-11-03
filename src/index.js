import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from 'reducers/index';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas/index';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();
const history = createHistory();

const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer,
    }),
    composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagaMiddleware.run(sagas);

ReactDOM.render(
    <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
