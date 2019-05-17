import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import Navbar from "../Navbar";

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const signout = jest.fn();

const signedIn = true;

const name = "Christian";

test("<Navbar /> not signed in", () => {
  const { getByTestId } = render(<Navbar />);
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(getByTestId("unsigned-in-title").textContent).toBe("EVENT DASHBOARD");
});

test("<Navbar /> Signed in", () => {
  const { getByTestId } = render(<Navbar signedIn={signedIn} name={name} />);
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(getByTestId("signed-in-title").textContent).toBe("Hello Christian");
});

test("<Navbar /> testing opening signup modal", () => {
  const { getByTestId } = render(<Navbar signedIn={false} name={name} />);
  expect(console.error).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId("unsigned-in-title"));
  expect(getByTestId("signin-method-title")).toBeTruthy();
});

test("<Navbar /> testing opening dropdown menu", () => {
  const { getByTestId } = render(<Navbar signedIn={signedIn} name={name} />);
  expect(console.error).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId("drop-down-button"));
  expect(getByTestId("sign-out-title")).toBeTruthy();
});

test("<Navbar /> testing signout method", () => {
  const { getByTestId } = render(
    <Navbar signedIn={signedIn} name={name} signout={signout} />
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId("drop-down-button"));
  expect(getByTestId("sign-out-title")).toBeTruthy();
  fireEvent.click(getByTestId("sign-out-title"));
  expect(signout).toHaveBeenCalled();
});
