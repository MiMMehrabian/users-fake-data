import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

// Import your root reducer here
import rootReducer, { RootState } from './reducers';
import { thunk } from 'redux-thunk';

// Configure the store with Redux Thunk and the Redux DevTools extension
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type AppDispatch = typeof store.dispatch;

export default store;