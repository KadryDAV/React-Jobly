import React from "react";
import { render } from "@testing-library/react";
import SignUp from "./SignUp";

test("renders Signup without crashing", () => {
  render(<SignUp />);
});

test("renders Signup correctly", () => {
  const { container } = render(<SignUp />);
  expect(container).toMatchSnapshot();
});
