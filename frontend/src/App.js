import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import LocalStorage from "./common/LocalStorage";
import jwt from "jsonwebtoken";
import "bootstrap/dist/css/bootstrap.min.css";

import JoblyApi from "./common/api";
import NavBar from "./routes/NavBar";
import Routes from "./routes/Routes";
import UserContext from "./UserContext";
import Spinner from "./common/Spinner";
import "./App.css";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */

const App = () => {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = LocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "infoLoaded=",
    infoLoaded,
    "applicationIds=",
    applicationIds,
    "currentUser=",
    currentUser,
    "token=",
    token
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setApplicationIds(new Set(currentUser.applications));
          //console.log("Current User: ", currentUser);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App getCurrentUser: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   * */
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      JoblyApi.token = token;
      setCurrentUser(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login. */
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      setCurrentUser(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Deletes a user and all their data */
  async function deleteUser() {
    try {
      await JoblyApi.deleteProfile(currentUser.username);
      logout();
      return { success: true };
    } catch (errors) {
      console.error("delete failed", errors);
      return { success: false, errors };
    }
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  /** Handles site-wide logout. */
  const logout = () => {
    setApplicationIds(null);
    setCurrentUser(null);
    setToken("token");
  };

  if (!infoLoaded) {
    return <Spinner />;
  }

  return (
    <div className="App mb-5">
      <BrowserRouter>
        <UserContext.Provider
          value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}
        >
          <NavBar logout={logout} />
          <Routes login={login} signup={signup} deleteUser={deleteUser} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;