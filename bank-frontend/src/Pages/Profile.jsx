import React from "react";
import "./Profile.css";

function Profile() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    return (

        <div className="profile-container">

            <div className="profile-card">

                <div className="profile-icon">
                    {user?.fullName?.charAt(0).toUpperCase()}
                </div>

                <h2>My Profile</h2>

                <div className="profile-info">

                    <p>
                        <strong>Name:</strong> {user?.fullName}
                    </p>

                    <p>
                        <strong>Username:</strong> {user?.username}
                    </p>

                    <p>
                        <strong>Email:</strong> {user?.email}
                    </p>

                    <p>
                        <strong>Mobile:</strong> {user?.mobileNumber}
                    </p>

                </div>

            </div>

        </div>

    );
}

export default Profile;