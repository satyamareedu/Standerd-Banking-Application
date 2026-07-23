import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullName: "",
        username: "",
        email: "",
        mobileNumber: "",
        password: "",
        address: ""
    });

    const [errors, setErrors] = useState({});

    const validate = () => {

        let tempErrors = {};

        if (!user.fullName.trim()) {
            tempErrors.fullName = "Full Name is required";
        }

        if (!user.username.trim()) {
            tempErrors.username = "Username is required";
        }

        if (!user.email.trim()) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            tempErrors.email = "Invalid Email";
        }

        if (!user.mobileNumber.trim()) {
            tempErrors.mobileNumber = "Mobile Number is required";
        } else if (!/^[6-9]\d{9}$/.test(user.mobileNumber)) {
            tempErrors.mobileNumber = "Enter valid mobile number";
        }

        if (!user.password.trim()) {
            tempErrors.password = "Password is required";
        } else if (user.password.length < 8) {
            tempErrors.password = "Minimum 8 characters";
        }

        if (!user.address.trim()) {
            tempErrors.address = "Address is required";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

          const response=  await axios.post(
                "http://localhost:8080/api/users/register",
                user
            );

            alert("Registration Successful");
            console.log(response.data);

            navigate("/login");

        } catch (error) {
             console.log(error)
            alert(
                error.response?.data ||
                "Registration Failed"
            );
        }
    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        onChange={handleChange}
                    />
                    <span className="error">
                        {errors.fullName}
                    </span>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                    />
                    <span className="error">
                        {errors.username}
                    </span>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <span className="error">
                        {errors.email}
                    </span>

                    <input
                        type="text"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        onChange={handleChange}
                    />
                    <span className="error">
                        {errors.mobileNumber}
                    </span>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <span className="error">
                        {errors.password}
                    </span>

                    <textarea
                        name="address"
                        placeholder="Address"
                        rows="3"
                        onChange={handleChange}
                    ></textarea>
                    <span className="error">
                        {errors.address}
                    </span>

                    <button type="submit">
                        REGISTER
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Register;