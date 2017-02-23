import * as interviewActionTypes from '../constants';

const initialState = [];

const actionsMap = {
  [interviewActionTypes.ADD_INTERVIEW](state, action) {
    return [
      action.interview,
      ...state,
    ];
  },
  [interviewActionTypes.ADD_INTERVIEWS](state, action) {
    return state.concat(action.interviews);
  },
  [interviewActionTypes.DELETE_INTERVIEW](state, action) {
    return state.filter((interview) =>
      interview.id !== action.interview.id
    );
  },
  [interviewActionTypes.UPDATE_INTERVIEW](state, action) {
    return state.map((interview) =>
      (interview.id === action.interview.id ?
        Object.assign({}, interview, action.interview) :
        interview)
    );
  },
  [interviewActionTypes.DELETE_INTERVIEWS](state, action) { // eslint-disable-line no-unused-vars
    return state.filter((interview) => // eslint-disable-line no-unused-vars
      false
    );
  },
};

export default function interviews(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
