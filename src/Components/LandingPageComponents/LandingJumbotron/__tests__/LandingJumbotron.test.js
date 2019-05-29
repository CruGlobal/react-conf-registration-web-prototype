import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import LandingJumbotron from "../LandingJumbotron";
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

test("<LandingJumbotron /> ", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <LandingJumbotron />
    </Provider>
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId("search-button"));
});
