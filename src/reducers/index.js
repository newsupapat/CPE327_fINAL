import { combineReducers } from 'redux';
import _ from 'lodash';

const INTIAL_STATE = {
  isSignedIn: false
};

const UserReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case 'USER_UPDATE':
      return { ...state, isSignedIn: true, ...action.payload };
    case 'DESTROY_UPDATE':
      return INTIAL_STATE;
    default:
      return state;
  }
};
const UserMoneyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MONEY_UPDATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  auth: UserReducer,
  money: UserMoneyReducer
});
