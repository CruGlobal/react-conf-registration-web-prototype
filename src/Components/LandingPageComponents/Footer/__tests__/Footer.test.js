import React from "react";
import { render } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import Footer from "../Footer";

console.error = jest.fn();

test("<Footer>", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  expect(console.error).toHaveBeenCalledTimes(0);
  expect(getByTestId("copyright-title").textContent).toBe("© 2019 | Cru");
});
