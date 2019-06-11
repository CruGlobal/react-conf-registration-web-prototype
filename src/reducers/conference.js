import {
  CONFERENCE_SEARCH,
  IS_LOADING,
  USER_CONFERENCE_SEARCH
} from "../constants";

const initialState = {
  conferences: [],
  selectedConference: {},
  currentRegistration: {},
  userConferences: [],
  isLoading: false
};

const conferenceReducer = (
  state = initialState,
  { type, conferences, isLoading, userConferences }
) => {
  switch (type) {
    case CONFERENCE_SEARCH:
      return {
        ...state,
        conferences: conferences,
        isLoading: isLoading
      };
    case USER_CONFERENCE_SEARCH:
      return {
        ...state,
        userConferences: userConferences,
        isLoading: isLoading
      };

    case IS_LOADING:
      return {
        ...state,
        isLoading: isLoading
      };
    default:
      return {
        ...state
      };
  }
};

export default conferenceReducer;
