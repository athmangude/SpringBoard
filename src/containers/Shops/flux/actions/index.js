import * as types from '../constants';

export function addShop(shop) {
  return { type: types.ADD_SHOP, shop };
}

export function addShops(shops) {
  console.log('ADDING SHOPS', shops);
  return { type: types.ADD_SHOPS, shops };
}

export function deleteShop(shop) {
  return { type: types.DELETE_SHOP, shop };
}

export function updateShop(shop) {
  return { type: types.UPDATE_SHOP, shop };
}

export function deleteShops() {
  return {
    type: types.DELETE_SHOPS,
  };
}

export function fetchShops(url) {
  console.log('fetching shops');
  return (dispatch) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('shops received', data.length);
        dispatch(deleteShops());
        dispatch(addShops(data));
      })
      .catch(e => {
        console.log(e);
      })
  };
}
