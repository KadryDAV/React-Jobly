import React from "react";
import { render } from "@testing-library/react";
import UserContext from "../UserContext";
import JobCards from "./JobCards";

describe("JobCards", () => {
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      salary: "120000",
      equity: "0.01",
      companyName: "Acme",
    },
    {
      id: 2,
      title: "Product Manager",
      salary: "150000",
      equity: "0.005",
      companyName: "Globex",
    },
  ];

  test("renders without errors", () => {
    render(
      <UserContext.Provider
        value={{ hasAppliedToJob: jest.fn(), applyToJob: jest.fn() }}
      >
        <JobCards jobs={jobs} />
      </UserContext.Provider>
    );
  });

  test("matches snapshot", () => {
    const { container } = render(
      <UserContext.Provider
        value={{ hasAppliedToJob: jest.fn(), applyToJob: jest.fn() }}
      >
        <JobCards jobs={jobs} />
      </UserContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
