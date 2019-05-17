import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import Navbar from "../Navbar";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const signout = jest.fn();

const name = "Christian";

test("<Navbar /> not signed in", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(getByTestId("unsigned-in-title").textContent).toBe("EVENT DASHBOARD");
});

test("<Navbar /> Signed in", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Navbar signedIn={true} name={name} />
    </MemoryRouter>
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(getByTestId("signed-in-title").textContent).toBe("Hello Christian");
});

test("<Navbar /> testing opening signup modal", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Navbar signedIn={false} name={name} />
    </MemoryRouter>
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId("unsigned-in-title"));
  expect(getByTestId("signin-method-title")).toBeTruthy();
});

test("<Navbar /> testing opening dropdown menu", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Navbar signedIn={true} name={name} />
    </MemoryRouter>
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId("drop-down-button"));
  expect(getByTestId("sign-out-title")).toBeTruthy();
});

test("<Navbar /> testing signout method", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Navbar signedIn={true} name={name} signout={signout} />
    </MemoryRouter>
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId("drop-down-button"));
  expect(getByTestId("sign-out-title")).toBeTruthy();
  fireEvent.click(getByTestId("sign-out-title"));
  expect(signout).toHaveBeenCalled();
});
