import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./OtpVerification.css";


function OtpVerification() {

    const location = useLocation();
    const navigate = useNavigate();

    const username = location.state?.username;

    const [otp, setOtp] = useState("");
    const [seconds,setSeconds]=useState(30);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{

        if(seconds<=0) return;

        const timer=setInterval(()=>{

            setSeconds(prev=>prev-1);

        },1000);

        return ()=>clearInterval(timer);

    },[seconds]);

    const verifyOtp=async(e)=>{

        e.preventDefault();

        try{

            const response=await axios.post(
                "http://localhost:8080/api/users/verify-otp",
                {
                    username,
                    otp
                }
            );

            alert(response.data);

           // localStorage.setItem("user",username);

            navigate("/dashboard");

        }
        catch(error){

            alert(error.response?.data || "Invalid OTP");

        }

    };

    const resendOtp=async()=>{

        try{

            setLoading(true);

            const response=await axios.post(
                `http://localhost:8080/api/users/resend-otp?username=${username}`
            );

            alert(response.data);

            setSeconds(30);

        }
        catch(error){

            alert(error.response?.data || "Unable to resend OTP");

        }
        finally{

            setLoading(false);

        }

    };

    const handleVerify = async (e) => {

        e.preventDefault();

        if (otp.trim() === "") {
            alert("Please enter OTP");
            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:8080/api/users/verify-otp",
                {
                    username: username,
                    otp: otp
                }
            );

            alert(response.data);

           // localStorage.setItem("user", username);

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data ||
                "Invalid OTP"
            );
        }
    };

    return (

        <div className="otp-container">

            <div className="otp-card">

                <h2>OTP Verification</h2>

                <p>
                    Enter the OTP sent to your registered email.
                </p>

                <form onSubmit={handleVerify}>

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) =>
                            setOtp(e.target.value)
                        }
                    />

                    <button type="submit">
                        Verify OTP
                    </button>

                     {
                        seconds>0 ?

                        <p className="timer">
                            Resend OTP in {seconds} sec
                        </p>

                        :

                        <button
                            type="button"
                            className="resend-btn"
                            onClick={resendOtp}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Resend OTP"}
                        </button>

                    }

                </form>

            </div>

        </div>

    );
}

export default OtpVerification;