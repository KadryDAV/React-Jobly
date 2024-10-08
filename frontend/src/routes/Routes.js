import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../home/Home";
import Companies from "../companies/Companies";
import CompanyInfo from "../companies/CompanyInfo";
import Jobs from "../jobs/Jobs";
import Login from "../forms/Login";
import SignUp from "../forms/SignUp";
import Profile from "../forms/Profile";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Parts of site are only visitable when logged in. Those routes are
 * wrapped by <Protected>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

const Routes = ({ login, signup, deleteUser }) => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          <Login login={login} />
        </Route>

        <Route exact path="/signup">
          <SignUp signup={signup} />
        </Route>

        <PrivateRoute exact path="/companies">
          <Companies />
        </PrivateRoute>

        <PrivateRoute exact path="/companies/:handle">
          <CompanyInfo />
        </PrivateRoute>

        <PrivateRoute exact path="/jobs">
          <Jobs />
        </PrivateRoute>

        <PrivateRoute exact path="/profile">
          <Profile deleteUser={deleteUser} />
        </PrivateRoute>

        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default Routes;
