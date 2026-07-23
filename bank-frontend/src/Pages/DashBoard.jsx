import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUniversity,
  FaUserPlus,
  FaUserCircle,
  FaArrowRight,
  FaSignOutAlt,
  FaShieldAlt,
} from "react-icons/fa";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* Header */}

      <header className="navbar">

        <div className="logo">

          <FaShieldAlt className="bank-icon" />

          <h2>Standard Bank</h2>

        </div>

        <button
          className="logout-btn"
          onClick={() => navigate("/logout")}
        >
          <FaSignOutAlt /> Logout
        </button>

      </header>

      {/* Welcome */}

      <div className="welcome">

        <h1>Welcome to Standard Bank</h1>

      </div>

      {/* Cards */}

      <div className="card-container">

        <div
          className="card"
          onClick={() => navigate("/accounts")}
        >
          <div className="icon-circle">
            <FaUniversity />
          </div>

          <h2>View Accounts</h2>

          <p>View and manage your accounts</p>

          <FaArrowRight className="arrow" />
        </div>

        <div
          className="card"
          onClick={() => navigate("/create-account")}
        >
          <div className="icon-circle">
            <FaUserPlus />
          </div>

          <h2>Open New Account</h2>

          <p>Open a new account in just a few steps</p>

          <FaArrowRight className="arrow" />
        </div>

        <div
          className="card"
          onClick={() => navigate("/profile")}
        >
          <div className="icon-circle">
            <FaUserCircle />
          </div>

          <h2>My Profile</h2>

          <p>View and update your profile details</p>

          <FaArrowRight className="arrow" />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;