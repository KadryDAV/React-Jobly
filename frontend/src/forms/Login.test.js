import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";

test("renders Login without crashing", () => {
  render(<Login />);
});

test("renders Login correctly", () => {
  const { container } = render(<Login />);
  expect(container).toMatchSnapshot();
});
