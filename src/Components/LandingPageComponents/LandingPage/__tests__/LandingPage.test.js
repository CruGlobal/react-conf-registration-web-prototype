import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import LandingPage from "../LandingPage";

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const signedIn = true;

const userProfile = {
  firstName: "Christian"
};

const emptyConferences = [];

const fullConferences = [
  {
    name: "first test conf",
    date: "06/29/2019"
  },
  {
    name: "second test conf",
    date: "06/29/2020"
  }
];

test("<LandingPage /> not signed in", () => {
  const { getByTestId } = render(
    <LandingPage userProfile={userProfile} conferences={emptyConferences} />
  );
  expect(getByTestId("register-title")).toBeTruthy();
  expect(getByTestId("unsigned-in-title")).toBeTruthy();
  expect(console.error).toHaveBeenCalledTimes(0);
});

test("<LandingPage /> signedIn", () => {
  const { getByTestId } = render(
    <LandingPage
      userProfile={userProfile}
      conferences={emptyConferences}
      signedIn={signedIn}
    />
  );
  expect(getByTestId("signed-in-title")).toBeTruthy();
  expect(getByTestId("register-title")).toBeTruthy();
  expect(getByTestId("signed-in-title").textContent).toBe("Hello Christian");
});

test("<LandingPage /> notSignedIn and Searching", () => {
  const { getByTestId } = render(
    <LandingPage
      userProfile={userProfile}
      conferences={emptyConferences}
      isLoading={true}
    />
  );

  expect(getByTestId("searching-title")).toBeTruthy();
  expect(getByTestId("unsigned-in-title")).toBeTruthy();
});

test("<LandingPage /> SignedIn and Searching", () => {
  const { getByTestId } = render(
    <LandingPage
      userProfile={userProfile}
      conferences={emptyConferences}
      signedIn={signedIn}
      isLoading={true}
    />
  );

  expect(getByTestId("searching-title")).toBeTruthy();
  expect(getByTestId("signed-in-title")).toBeTruthy();
  expect(getByTestId("signed-in-title").textContent).toBe("Hello Christian");
});

test("<LandingPage /> SignedIn and afterSearching", () => {
  const { getByTestId } = render(
    <LandingPage
      userProfile={userProfile}
      conferences={fullConferences}
      signedIn={signedIn}
      isLoading={false}
    />
  );

  expect(getByTestId("results-container")).toBeTruthy();
  expect(getByTestId("signed-in-title")).toBeTruthy();
  expect(getByTestId("signed-in-title").textContent).toBe("Hello Christian");
});
