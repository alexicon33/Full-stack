import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';

const saver = store => next => action => {
  let result = next(action);
  localStorage['Alexicon_app_saveSettings'] = JSON.stringify(
    store.getState().saveSettings
  );
  return result;
};

const initStorage = (initialState = {}) => {
  if (localStorage['Alexicon_app_saveSettings']) {
    return {
      ...initialState,
      saveSettings: JSON.parse(localStorage['Alexicon_app_saveSettings'])
    };
  }
  return initialState;
};

const initialState = {
  isLoggedIn: false,
  username: '',
  saveSettings: {
    betView: '%',
    navbarDesign: 'dark',
    bank: 0
  }
};

const loadedState = initStorage(initialState);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  loadedState,
  composeEnhancers(applyMiddleware(saver))
);

export default store;
