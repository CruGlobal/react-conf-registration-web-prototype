import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import LandingJumbotron from "../LandingJumbotron";

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const setIsLoading = jest.fn();

const setConferences = jest.fn();

test("<LandingJumbotron /> ", () => {
  const { getByTestId } = render(
    <LandingJumbotron
      setIsLoading={setIsLoading}
      setConferences={setConferences}
    />
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  fireEvent.click(getByTestId("search-button"));
  expect(setIsLoading).toHaveBeenCalled();
  expect(setConferences).toHaveBeenCalled();
});
