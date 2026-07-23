import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Forgot.css";

function ForgotPassword() {

    const [identifier, setIdentifier] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = async () => {

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            await axios.post(
                "http://localhost:8080/api/users/reset-password",
                {
                    identifier,
                    newPassword
                }
            );

            alert("Password Changed Successfully");

            setIdentifier("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {

            alert(
                error.response?.data ||
                "Failed to Reset Password"
            );
        }
    };

    return (
        <div className="forgot-container">

            <div className="forgot-card">

                <h2>Reset Password</h2>

                <p>
                    Enter Username or Email
                </p>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Username or Email"
                        value={identifier}
                        onChange={(e) =>
                            setIdentifier(e.target.value)
                        }
                    />
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                    />
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />
                </div>

                <button
                    className="submit-btn"
                    onClick={handleResetPassword}
                >
                    Reset Password
                </button>

                <div className="back-link">
                    <Link to="/login">
                        Back to Login
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default ForgotPassword;