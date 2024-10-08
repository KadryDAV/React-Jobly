import React from "react";
import { render } from "@testing-library/react";
import Companies from "./Companies";

describe("Companies", () => {
  test("renders without errors", () => {
    render(<Companies />);
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<Companies />);
    expect(asFragment()).toMatchSnapshot();
  });
});
