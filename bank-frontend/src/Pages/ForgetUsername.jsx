import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Forgot.css";

function ForgotUsername() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const handleGetUsername = async () => {

        try {

           const response = await axios.get(
    "http://localhost:8080/api/users/forgot-username",
    {
        params: {
            email: email
        }
    }
);

            setUsername(response.data);

        } catch (error) {

            alert("Email not found");
        }
    };

    return (
        <div className="forgot-container">

            <div className="forgot-card">

                <h2>Forgot Username</h2>

                <p>
                    Enter your registered email address
                </p>

                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>

                <button
                    className="submit-btn"
                    onClick={handleGetUsername}
                >
                    Get Username
                </button>

                {username && (
                    <div className="username-box">
                        <strong>Your Username:</strong> {username}
                    </div>
                )}

                <div className="back-link">
                    <Link to="/login">
                        Back to Login
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default ForgotUsername;