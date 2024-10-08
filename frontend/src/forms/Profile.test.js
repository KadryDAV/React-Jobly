import React from "react";
import { render } from "@testing-library/react";
import Profile from "./Profile";
import UserContext from "../UserContext";

const currentUser = {
  username: "testuser",
  firstName: "Test",
  lastName: "User",
  email: "testuser@gmail.com",
};

const deleteUser = jest.fn();

// Mock context for testing
const Wrapper = ({ children }) => (
  <UserContext.Provider value={{ currentUser }}>
    {children}
  </UserContext.Provider>
);

// Smoke test
it("renders without crashing", () => {
  render(<Profile deleteUser={deleteUser} />, { wrapper: Wrapper });
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(<Profile deleteUser={deleteUser} />, {
    wrapper: Wrapper,
  });
  expect(asFragment()).toMatchSnapshot();
});
