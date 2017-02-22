import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import createReducer from './reducers';

export default function configureStore() {
  const middlewares = [
    thunkMiddleWare,
  ];
  const enhancers = [
    applyMiddleware(...middlewares),
    autoRehydrate(),
  ];

  const store = createStore(
    createReducer(),
    undefined,
    compose(...enhancers)
  );

  // begin periodically persisting the store
  if (typeof self === 'object') persistStore(store, {storage: AsyncStorage})

  return store;
}
