import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
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
    <MemoryRouter>
      <LandingPage userProfile={userProfile} conferences={emptyConferences} />
    </MemoryRouter>
  );
  expect(getByTestId("register-title")).toBeTruthy();
  expect(getByTestId("unsigned-in-title")).toBeTruthy();
  expect(console.error).toHaveBeenCalledTimes(0);
});

test("<LandingPage /> signedIn", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <LandingPage
        userProfile={userProfile}
        conferences={emptyConferences}
        signedIn={signedIn}
      />
    </MemoryRouter>
  );
  expect(getByTestId("signed-in-title")).toBeTruthy();
  expect(getByTestId("register-title")).toBeTruthy();
  expect(getByTestId("signed-in-title").textContent).toBe("Hello Christian");
});

test("<LandingPage /> notSignedIn and Searching", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <LandingPage
        userProfile={userProfile}
        conferences={emptyConferences}
        isLoading={true}
      />
    </MemoryRouter>
  );

  expect(getByTestId("searching-title")).toBeTruthy();
  expect(getByTestId("unsigned-in-title")).toBeTruthy();
});

test("<LandingPage /> SignedIn and Searching", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <LandingPage
        userProfile={userProfile}
        conferences={emptyConferences}
        signedIn={signedIn}
        isLoading={true}
      />
    </MemoryRouter>
  );

  expect(getByTestId("searching-title")).toBeTruthy();
  expect(getByTestId("signed-in-title")).toBeTruthy();
  expect(getByTestId("signed-in-title").textContent).toBe("Hello Christian");
});

test("<LandingPage /> SignedIn and afterSearching", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <LandingPage
        userProfile={userProfile}
        conferences={fullConferences}
        signedIn={signedIn}
        isLoading={false}
      />
    </MemoryRouter>
  );

  expect(getByTestId("results-container")).toBeTruthy();
  expect(getByTestId("signed-in-title")).toBeTruthy();
  expect(getByTestId("signed-in-title").textContent).toBe("Hello Christian");
});
