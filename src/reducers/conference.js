import {
  CONFERENCE_SEARCH,
  IS_LOADING,
  USER_CONFERENCE_SEARCH,
  GET_CURRENT_CONFERENCE,
  GET_CURRENT_REGISTRANT
} from "../constants";

const initialState = {
  conferences: [],
  selectedConference: {
    abbreviation: null,
    accountNumber: null,
    allowEditRegistrationAfterComplete: null,
    archived: null,
    businessUnit: null,
    checkMailingAddress: null,
    checkMailingCity: null,
    checkMailingState: null,
    checkMailingZip: null,
    checkPayableTo: null,
    combineSpouseRegistrations: null,
    completedRegistrationCount: null,
    contactPersonEmail: "",
    contactPersonName: null,
    contactPersonPhone: "",
    contactWebsite: null,
    cruEvent: null,
    cssUrl: null,
    customPaymentEmailText: null,
    department: null,
    description: null,
    eventEndTime: "",
    eventStartTime: "",
    eventTimezone: null,
    facebookLogin: null,
    glAccount: null,
    id: null,
    instagramLogin: null,
    locationAddress: null,
    locationCity: null,
    locationName: null,
    locationState: null,
    locationZipCode: null,
    loggedInUserPermissionLevel: null,
    name: null,
    operatingUnit: null,
    paymentGatewayId: null,
    paymentGatewayKey: null,
    paymentGatewayKeySaved: true,
    paymentGatewayType: null,
    projectId: null,
    promotions: [],
    registrantTypes: [],
    registrationCompleteRedirect: null,
    registrationCount: null,
    registrationEndTime: null,
    registrationOpen: null,
    registrationPages: [{ id: "", blocks: [] }],
    registrationStartTime: null,
    relayLogin: null,
    rideshareEmailContent: null,
    rideshareEnabled: null
  },
  currentRegistration: {
    primaryRegistrantId: "",
    registrants: [
      {
        answers: [
          {
            amount: 0,
            blockId: "",
            id: "",
            registrantId: ""
          }
        ],
        id: ""
      }
    ]
  },
  userConferences: [],
  isLoading: false
};

const conferenceReducer = (
  state = initialState,
  {
    type,
    conferences,
    isLoading,
    userConferences,
    selectedConference,
    currentRegistration
  }
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
    case GET_CURRENT_CONFERENCE:
      return {
        ...state,
        selectedConference: selectedConference,
        isLoading: isLoading
      };

    case GET_CURRENT_REGISTRANT:
      return {
        ...state,
        currentRegistration: currentRegistration,
        isLoading: false
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
