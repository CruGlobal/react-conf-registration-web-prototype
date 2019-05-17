import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import Navbar from "../Navbar";

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

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
