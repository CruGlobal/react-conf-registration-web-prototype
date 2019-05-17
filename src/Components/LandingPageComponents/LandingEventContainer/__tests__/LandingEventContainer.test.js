import React from "react";
import { render, cleanup } from "react-testing-library";
import LandingEventContainer from "../LandingEventContainer";

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const conferences = [
  {
    name: "Fake Conference",
    date: "Some Date"
  }
];

const emptyConferences = [];

const isLoading = true;

test("<LandingEventContainer /> ", () => {
  const { getByTestId } = render(
    <LandingEventContainer conferences={conferences} />
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(getByTestId("results-container").textContent).toBe("Results found");
});

test("<LandingEventContainer/> with no conferences", () => {
  const { getByTestId } = render(
    <LandingEventContainer conferences={emptyConferences} />
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(getByTestId("register-title").textContent).toBe(
    "Register for an event"
  );
});

test("<LandingEventContainer /> while searching", () => {
  const { getByTestId, debug } = render(
    <LandingEventContainer
      conferences={emptyConferences}
      isLoading={isLoading}
    />
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(getByTestId("searching-title").textContent).toBe(
    "Searching Events..."
  );
});
