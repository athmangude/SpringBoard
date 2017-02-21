import { fromJS } from 'immutable';
import * as shopActionTypes from '../constants';

const initialState = []

const actionsMap = {
  [shopActionTypes.ADD_SHOP](state, action) {
    return [
      action.shop,
      ...state,
    ];
  },
  [shopActionTypes.ADD_SHOPS](state, action) {
    return state.concat(action.shops);
  },
  [shopActionTypes.DELETE_SHOP](state, action) {
    return state.filter((shop) =>
      shop.id !== action.shop.id
    );
  },
  [shopActionTypes.UPDATE_SHOP](state, action) {
    return state.map((shop) =>
      (shop.id === action.shop.id ?
        Object.assign({}, shop, action.shop) :
        shop)
    );
  },
  [shopActionTypes.DELETE_SHOPS](state, action) { // eslint-disable-line no-unused-vars
    return state.filter((shop) => // eslint-disable-line no-unused-vars
      false
    );
  },
};

export default function shops(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
