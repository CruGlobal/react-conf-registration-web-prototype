import {
  CONFERENCE_SEARCH,
  IS_LOADING,
  USER_CONFERENCE_SEARCH
} from "../constants";

import APIController from "../Controllers/apicontroller";

const API = new APIController();

export const conferenceSearch = searchQuery => {
  return dispatch => {
    dispatch({
      type: IS_LOADING,
      isLoading: true
    });
    setConferences(dispatch, searchQuery);
  };
};

const setConferences = async (dispatch, searchQuery) => {
  try {
    API.getConferences(
      `${API.BASE_URL}${API.CONFERENCE_SEARCH_NAME}${searchQuery}`
    )
      .then(res => res.json())
      .then(response => {
        dispatch({
          type: CONFERENCE_SEARCH,
          conferences: response,
          isLoading: false
        });
      });
  } catch (err) {
    dispatch({
      type: CONFERENCE_SEARCH,
      conferences: []
    });
  }
  dispatch({
    type: IS_LOADING,
    isLoading: true
  });
};

export const userConferenceSearch = token => {
  return dispatch => {
    dispatch({
      type: IS_LOADING,
      isLoading: true
    });
    setUserConferences(dispatch, token);
  };
};

const setUserConferences = async (dispatch, token) => {
  try {
    API.getUsersConferences(`${API.BASE_URL}${API.USER_CONFERENCES}`, token)
      .then(res => res.json())
      .then(response => {
        dispatch({
          type: USER_CONFERENCE_SEARCH,
          userConferences: response,
          isLoading: false
        });
      });
  } catch (err) {
    dispatch({
      type: USER_CONFERENCE_SEARCH,
      userConferences: []
    });
  }
  dispatch({
    type: IS_LOADING,
    isLoading: true
  });
};
