import * as types from '../constants';

export function addInterview(interview) {
  return { type: types.ADD_INTERVIEW, interview };
}

export function addInterviews(interviews) {
  return { type: types.ADD_INTERVIEWS, interviews };
}

export function deleteInterview(interview) {
  return { type: types.DELETE_INTERVIEW, interview };
}

export function updateInterview(interview) {
  return { type: types.UPDATE_INTERVIEW, interview };
}

export function deleteInterviews() {
  return {
    type: types.DELETE_INTERVIEWS,
  };
}

export function fetchInterviews(url) {
  console.log('fetching interviews');
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
        dispatch(deleteInterviews());
        dispatch(addInterviews(data));
      })
      .catch(e => {
        console.log(e);
      })
  };
}
