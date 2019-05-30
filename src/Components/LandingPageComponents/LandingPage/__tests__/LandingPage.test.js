import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "../LandingPage";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../../../../reducers";
import thunk from "redux-thunk";

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk)));

test("<LandingPage /> not signed in", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </MemoryRouter>
  );
});

test("<LandingPage /> signedIn", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </MemoryRouter>
  );
});

test("<LandingPage /> notSignedIn and Searching", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </MemoryRouter>
  );
});

test("<LandingPage /> SignedIn and Searching", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </MemoryRouter>
  );
});

test("<LandingPage /> SignedIn and afterSearching", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </MemoryRouter>
  );
});
