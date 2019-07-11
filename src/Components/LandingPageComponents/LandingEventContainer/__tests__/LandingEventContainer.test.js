import React from "react";
import { render, cleanup } from "react-testing-library";
import LandingEventContainer from "../LandingEventContainer";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../../../../reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { conferenceSearch } from "../../../../actions";
import { MemoryRouter } from "react-router-dom";
import { IS_LOADING, CONFERENCE_SEARCH } from "../../../../constants";

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const initialState = {
  conferences: [],
  selectedConference: {},
  currentRegistration: {},
  isLoading: false
};

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk))
);

test("<LandingEventContainer /> ", () => {
  store.dispatch({
    type: CONFERENCE_SEARCH,
    conferences: [
      {
        title: "Hello"
      },
      {
        title: "Hello2"
      }
    ]
  });
  const { getAllByTestId } = render(
    <Provider store={store}>
      <MemoryRouter>
        <LandingEventContainer />
      </MemoryRouter>
    </Provider>
  );
  expect(getAllByTestId("Card")).toBeTruthy();
});

test("<LandingEventContainer/> with no conferences", () => {
  store.dispatch({
    type: CONFERENCE_SEARCH,
    conferences: []
  });
  const { getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter>
        <LandingEventContainer />
      </MemoryRouter>
    </Provider>
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(getByTestId("register-title").textContent).toBe(
    "Register for an event"
  );
});

test("<LandingEventContainer /> while searching", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <MemoryRouter>
        <LandingEventContainer />
      </MemoryRouter>
    </Provider>
  );
  store.dispatch({
    type: IS_LOADING,
    isLoading: true
  });
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(getByTestId("searching-title").textContent).toBe(
    "Searching Events..."
  );
});
