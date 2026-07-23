import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

function Logout() {

    const navigate = useNavigate();

    useEffect(() => {

        localStorage.removeItem("user");

        setTimeout(() => {
            navigate("/login");
        }, 3000);

    }, [navigate]);

    return (
        <div className="logout-container">

            <div className="logout-card">

                <div className="check-icon">
                    ✓
                </div>

                <h1>Logout Successful</h1>

                <p>
                    Thank you for banking with us.
                </p>

                <p className="redirect">
                    Redirecting to Login Page...
                </p>

            </div>

        </div>
    );
}

export default Logout;