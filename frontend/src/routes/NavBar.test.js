import React from 'react';
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserContext from "../UserContext";
import NavBar from "./NavBar";

test("renders without crashing", () => {
  const { getByRole } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: null }}>
        <NavBar />
      </UserContext.Provider>
    </MemoryRouter>
  );
  const navBar = getByRole("navigation");
  expect(navBar).toBeInTheDocument();
});

test("matches snapshot for logged out user", () => {
  const { container } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: null }}>
        <NavBar />
      </UserContext.Provider>
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});

test("matches snapshot for logged in user", () => {
  const { container } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: { username: "testuser" } }}>
        <NavBar />
      </UserContext.Provider>
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});
