import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import navReducer from './store/reducers/nav';
import messageReducer from './store/reducers/messages';
import App from './App';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function configureStore() {
  const rootReducer = combineReducers({
    auth: authReducer,
    message: messageReducer,
    nav: navReducer,
  });

    const store = createStore(rootReducer, composeEnhances(
        applyMiddleware(thunk)
    ));

    if (module.hot) {
      module.hot.accept('./store/reducers', () => {
        const nextRootReducer = require('./store/reducers/auth');
        store.replaceReducer(nextRootReducer);
      });
    }

    return store;
}

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <Provider store={store}>
        <App />
  </Provider>
);