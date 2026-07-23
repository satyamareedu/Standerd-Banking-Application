import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaSignInAlt } from "react-icons/fa";
import "./SignInHome.css";

function SignInHome() {

  const navigate = useNavigate();

  return (
    <div className="home">

      {/* Navbar */}

      <nav className="navbar">

        <div className="logo">
          <FaShieldAlt className="logo-icon"/>
          <h2>Standard Bank</h2>
        </div>

        <button
          className="signin-nav-btn"
          onClick={() => navigate("/login")}
        >
          <FaSignInAlt />
          Sign In
        </button>

      </nav>

      {/* Hero Section */}

      <div className="hero">

        <div className="overlay">

          <div className="content">

            <h1>Welcome to Standard Bank</h1>

            <p>
              Secure, simple and smarter banking.
              Manage your accounts anytime, anywhere.
            </p>

            {/* <div className="buttons">

              <button
                className="primary-btn"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate("/register")}
              >
                Register
              </button> */}

            </div>

          </div>

        </div>

      </div>

  );
}

export default SignInHome;