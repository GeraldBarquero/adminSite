import { combineReducers } from 'redux';
import * as actionType from '../actions/types';

const tokenInitialState = null;
const roleInitialState = null;
const token = (state = tokenInitialState, action) => {
  switch(action.type) {
    case actionType.SET_TOKEN:
      return action.data;
    default:
      return state;
  }
}
const role = (state = roleInitialState, action) => {
  switch(action.type) {
    case actionType.SET_ROLE:
      return action.data;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  token, role,
})

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;