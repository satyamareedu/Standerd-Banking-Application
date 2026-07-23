import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {

    let tempErrors = {};

    if (!formData.username.trim()) {
      tempErrors.username = "Required";
    }

    if (!formData.password.trim()) {
      tempErrors.password = "Required";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) {
        return;
    }

    try {

        const response = await axios.post(
            "http://localhost:8080/api/users/login",
            {
                username: formData.username,
                password: formData.password
            }
        );
        console.log("Response:", response.data);
         localStorage.setItem("user", JSON.stringify(response.data.user));
         console.log(localStorage.getItem("user"));
        alert(response.data.message);

        navigate("/verify-otp", {
    state: {
        username: formData.username
    }
  });

    } catch (error) {
      console.log(error.response?.data);

        alert(
            error.response?.data?.message ||
            "Invalid Username or Password"
        );
    }
};

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>Sign in</h2>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />

            {errors.username && (
              <span className="error">
                {errors.username}
              </span>
            )}

          </div>

          <div className="input-group password-group">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <span
              className="show-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "HIDE" : "SHOW"}
            </span>

            {errors.password && (
              <span className="error">
                {errors.password}
              </span>
            )}

          </div>

          <button
            type="submit"
            className="signin-btn"
          >
            SIGN IN
          </button>

          <button
            type="button"
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            REGISTER
          </button>

        </form>

        <div className="links">

          <Link to="/forgot-password">
            Forgot password
          </Link>

          <span>|</span>

          <Link to="/forgot-username">
            Forgot username
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;