import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import Navbar from "../Navbar";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../../../../reducers";
import thunk from "redux-thunk";
import { successfulLogin, userLogout } from "../../../../actions";

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const initialState = {
  crsToken: "123",
  loginState: true,
  profile: {
    firstName: "Christian"
  }
};
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk))
);

test("<Navbar /> not signed in", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </MemoryRouter>
  );
  expect(getByTestId("unsigned-in-title").textContent).toBe("EVENT DASHBOARD");
});

test("<Navbar /> Signed in", () => {
  store.dispatch(successfulLogin());
  const { getByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </MemoryRouter>
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(getByTestId("signed-in-title").textContent).toBe("Hello ");
});

test("<Navbar /> testing opening signup modal", () => {
  store.dispatch(userLogout());
  const { getByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </MemoryRouter>
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId("unsigned-in-title"));
  expect(getByTestId("signin-method-title")).toBeTruthy();
});

test("<Navbar /> testing opening dropdown menu", () => {
  store.dispatch(successfulLogin());
  const { getByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </MemoryRouter>
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId("drop-down-button"));
  expect(getByTestId("sign-out-title")).toBeTruthy();
});

test("<Navbar /> testing signout method", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </MemoryRouter>
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId("drop-down-button"));
  expect(getByTestId("sign-out-title")).toBeTruthy();
  fireEvent.click(getByTestId("sign-out-title"));
  store.dispatch(userLogout());
});
