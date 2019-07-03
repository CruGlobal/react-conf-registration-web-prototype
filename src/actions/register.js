import {
  IS_LOADING,
  IS_SAVING,
  GET_CURRENT_CONFERENCE,
  GET_CURRENT_REGISTRANT,
  DATA_CHANGED
} from "../constants";
import APIController from "../Controllers/apicontroller";

const API = new APIController();

export const selectConference = (authToken, confID) => {
  return dispatch => {
    dispatch({
      type: IS_LOADING,
      isLoading: true
    });
    setCurrentConference(dispatch, confID, authToken);
  };
};

const setCurrentConference = async (dispatch, confID, authToken) => {
  try {
    API.getSelectedConference(
      `${API.BASE_URL}${API.SELECTED_CONFERENCE}${confID}`,
      authToken
    )
      .then(res => res.json())
      .then(response => {
        dispatch({
          type: GET_CURRENT_CONFERENCE,
          selectedConference: response,
          isLoading: false
        });
      });
  } catch (err) {
    dispatch({
      type: GET_CURRENT_CONFERENCE,
      conferences: []
    });
  }
  dispatch({
    type: IS_LOADING,
    isLoading: true
  });
};

export const GetCurrentRegistrant = (authToken, confID) => {
  return dispatch => {
    dispatch({
      type: IS_LOADING,
      isLoading: true
    });
    setCurrentRegistrant(dispatch, confID, authToken);
  };
};

const setCurrentRegistrant = async (dispatch, confID, authToken) => {
  try {
    API.getCurrentRegistration(
      `${API.BASE_URL}${API.CONFERENCES}${confID}/${API.CURRENT_REGISTRATION}`,
      authToken
    )
      .then(res => res.json())
      .then(response => {
        if (response.error) {
          API.createNewRegistration(
            `${API.BASE_URL}${API.CONFERENCES}${confID}/registrations}`,
            authToken
          );
        } else {
          dispatch({
            type: GET_CURRENT_REGISTRANT,
            currentRegistration: response,
            isLoading: false
          });
          dispatch({
            type: DATA_CHANGED,
            dataChanged: false
          });
        }
      });
  } catch (err) {
    dispatch({
      type: GET_CURRENT_REGISTRANT,
      currentRegistration: {}
    });
  }
  dispatch({
    type: IS_LOADING,
    isLoading: true
  });
};

export const DeleteCurrentRegistrant = (authToken, confID, regID) => {
  return dispatch => {
    dispatch({
      type: IS_LOADING,
      isLoading: true
    });
    deleteCurrentRegistrant(dispatch, authToken, confID, regID);
  };
};

const deleteCurrentRegistrant = async (dispatch, authToken, confID, regID) => {
  try {
    API.deleteCurrentRegistration(
      `${API.BASE_URL}${API.REGISTRANTS}${regID}`,
      authToken
    ).then(() => {
      API.getCurrentRegistration(
        `${API.BASE_URL}${API.CONFERENCES}${confID}/${
          API.CURRENT_REGISTRATION
        }`,
        authToken
      )
        .then(res => res.json())
        .then(response => {
          dispatch({
            type: GET_CURRENT_REGISTRANT,
            currentRegistration: response,
            isLoading: false
          });
        });
    });
  } catch (err) {
    dispatch({
      type: GET_CURRENT_REGISTRANT,
      currentRegistration: {}
    });
  }
  dispatch({
    type: IS_LOADING,
    isLoading: true
  });
};

export const UpdateCurrentRegistration = (
  authToken,
  userId,
  confID,
  currentData
) => {
  return dispatch => {
    dispatch({
      type: IS_LOADING,
      isLoading: true
    });
    updateCurrentRegistration(dispatch, authToken, userId, confID, currentData);
  };
};

const updateCurrentRegistration = (
  dispatch,
  authToken,
  userId,
  confID,
  currentData
) => {
  try {
    API.updateRegistration(
      `${API.BASE_URL}${API.REGISTRATIONS}${userId}`,
      authToken,
      currentData
    ).then(() => {
      API.getCurrentRegistration(
        `${API.BASE_URL}${API.CONFERENCES}${confID}/${
          API.CURRENT_REGISTRATION
        }`,
        authToken
      )
        .then(res => res.json())
        .then(response => {
          dispatch({
            type: GET_CURRENT_REGISTRANT,
            currentRegistration: response,
            isLoading: false
          });
        });
    });
  } catch (err) {
    dispatch({
      type: GET_CURRENT_REGISTRANT,
      currentRegistration: {}
    });
  }
  dispatch({
    type: IS_LOADING,
    isLoading: true
  });
};

export const isSaving = boolean => {
  return dispatch => {
    dispatch({
      type: IS_SAVING,
      isSaving: boolean
    });
  };
};

export const dataChanged = boolean => {
  return dispatch => {
    dispatch({
      type: DATA_CHANGED,
      dataChanged: boolean
    });
  };
};
