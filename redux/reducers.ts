import { combineReducers } from 'redux';
import userReducer from './users/reducer';

export interface RootState {
  // Add other feature states here
  users: any
}

const rootReducer = combineReducers({
  // Add other feature reducers here
  users: userReducer,

});

export default rootReducer;
