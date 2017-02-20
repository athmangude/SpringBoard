import { combineReducers } from 'redux-immutable';
import shopsReducer from './containers/Shops/flux/reducers';

export default function createReducer() {
  return combineReducers({
    shops: shopsReducer,
  });
}
