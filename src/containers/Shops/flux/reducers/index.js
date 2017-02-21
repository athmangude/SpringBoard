// import { fromJS } from 'immutable';
// import * as shopActionTypes from '../constants';
//
// // const initialState = fromJS([]);
// const initialState = []
//
// const actionsMap = {
//   [shopActionTypes.ADD_SHOP](state, action) {
//     return [
//       action.shop,
//       ...state,
//     ];
//     // return state.push(action.shop);
//   },
//   [shopActionTypes.ADD_SHOPS](state, action) {
//     return action.shops.concat(state);
//     // return state.concat(action.shops);
//   },
//   [shopActionTypes.DELETE_SHOP](state, action) {
//     return state.filter((shop) =>
//       shop.id !== action.shop.id
//       // shop.get('id') !== action.shop.id
//     );
//   },
//   [shopActionTypes.UPDATE_SHOP](state, action) {
//     return state.map((shop) =>
//       (shop.id === action.shop.id ?
//         Object.assign({}, shop, action.shop) :
//         shop)
//     );
//
//     // return state.update(
//     //   state.findIndex((shop) =>
//     //     shop._id === action.shop._id // eslint-disable-line no-underscore-dangle
//     //   ), (shop) =>
//     //     Object.assign(shop, action.shop)
//     // );
//   },
//   [shopActionTypes.DELETE_SHOPS](state, action) { // eslint-disable-line no-unused-vars
//     return state.filter((shop) => // eslint-disable-line no-unused-vars
//       false
//     );
//     // return state.clear();
//   },
// };
//
// export default function shops(state = initialState, action) {
//   const reduceFn = actionsMap[action.type];
//   if (!reduceFn) return state;
//   return reduceFn(state, action);
// }

const initialState = [];
export default function shops(state = initialState, action) {
  console.log(state, action);
  switch (action.type) {
    case 'ADD_SHOPS':
      return state.concat(action.shops);
    default:
      return state;
  }
}
