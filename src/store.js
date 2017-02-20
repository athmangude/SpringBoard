import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { fromJS } from 'immutable';
import createReducer from './reducers';

export default function configureStore(initialState = {}) {
  const middlewares = [
    thunkMiddleWare,
  ];
  const enhancers = [
    applyMiddleware(...middlewares),
  ];


  const store = createStore(
    createReducer(),
    fromJS(initialState),
    compose(...enhancers)
  );

  return store;
}
