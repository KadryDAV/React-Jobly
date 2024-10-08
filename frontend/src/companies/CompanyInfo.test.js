import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import CompanyInfo from "./CompanyInfo";

describe("CompanyInfo", () => {
  it("renders without errors", () => {
    render(
      <MemoryRouter>
        <CompanyInfo />
      </MemoryRouter>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={["/companies/handle"]}>
        <Route path="/companies/:handle">
          <CompanyInfo />
        </Route>
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
