import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-router-dom';
import { Provider } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-redux';
import {
  createStore,
  applyMiddleware,
} from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/redux';
import createSagaMiddleware from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/redux-saga';
import { composeWithDevTools } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/redux-devtools-extension';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from './modules/user';
import { HelmetProvider } from 'C:/Users/kuuha/AppData/Local/Yarn/Data/global/node_modules/react-helmet-async';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

const loadUser = () => {
  try {
    const user = localStorage.getItem('user');
    if (!user) return;

    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
};

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
