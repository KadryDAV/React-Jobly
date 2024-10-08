import React, { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "./Home.css";

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Home-container">
      <div className="Home">
        <div className="text-container">
          <h1 className="mb-4 font-weight-bold mt-5">
            The best jobs with Jobly.
          </h1>
          <p className="mb-4 font-weight-light">
            All the jobs in one, convenient place.
          </p>
          {currentUser ? (
            <h2>
              Welcome back, {currentUser.firstName || currentUser.username}!
            </h2>
          ) : (
            <div>
              <Link to="/login">
                <Button color="success">Login</Button>
              </Link>
              <Link to="/signup" className="ml-3">
                <Button color="success">Sign up</Button>
              </Link>
              <p className="mt-3">
                To explore and test out the features, feel free to log in using
                the username 'testuser' and the password 'password'.
              </p>
            </div>
          )}
        </div>
        <div className="image-container">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="working"
            className="home-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
