import { combineReducers } from 'redux';
import interviewsReducer from './containers/Interviews/flux/reducers';

export default function createReducer() {
  return combineReducers({
    interviews: interviewsReducer,
  });
}
