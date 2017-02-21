import { combineReducers } from 'redux';
import shopsReducer from './containers/Shops/flux/reducers';

export default function createReducer() {
  return combineReducers({
    shops: shopsReducer,
  });
}
