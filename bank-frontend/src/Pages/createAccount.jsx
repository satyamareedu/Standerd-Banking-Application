import React, { useState } from "react";
import axios from "axios";
import './CreateAccount.css';
function CreateAccount() {
  
   //const userData = localStorage.getItem("user");
//const user = userData ? JSON.parse(userData) : null;


const userString = localStorage.getItem("user");
console.log("User from localStorage:", userString);
let user = null;

try {
    user = userString ? JSON.parse(userString) : null;
} catch (e) {
    console.error("Invalid user data in localStorage:", userString);
    localStorage.removeItem("user");
}

  const [account, setAccount] = useState({
    accountHolderName: user?.fullName ||  "",
    accountType: "",
    currency: "",
    initialDeposit: "",
    sourceOfFunds: "",
    purpose: ""
  });

  const handleChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending data:", account);
      
    try{
      const response=await axios.post(
      "http://localhost:8080/api/accounts",
      account
    );

    alert("Account Created Successfully");
    console.log(response.data);

setAccount({
  accountHolderName: user?.fullName|| "",
  accountType: "",
  currency: "",
  initialDeposit: "",
  sourceOfFunds: "",
  purpose: ""
});
  }
  catch(error)
  {
    console.error(error);
    alert(
   error.response?.data?.message ||
   error.response?.data ||
  "Failed to create account");
  }

  }
  return (
  <div className="account-container">
    <div className="account-card">
      <h2>Create Bank Account</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Account Holder Name</label>
          <input
            type="text"
            name="accountHolderName"
            className="form-control"
            onChange={handleChange}
            value={account.accountHolderName}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Account Type</label>
          <select
            name="accountType"
            className="form-control"
            onChange={handleChange}
            value={account.accountType}
          >
            <option value="">Select Type</option>
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
            <option value="Salary">Salary</option>
          </select>
        </div>

        <div className="form-group">
          <label>Currency</label>
          <select
            name="currency"
            value={account.currency}
            className="form-control"
            onChange={handleChange}
          >
            <option value="">Select Currency</option>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div className="form-group">
          <label>Initial Deposit</label>
          <input
            type="number"
            name="initialDeposit"
            className="form-control"
            value={account.initialDeposit}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Source Of Funds</label>
          <input
            type="text"
            name="sourceOfFunds"
            className="form-control"
            onChange={handleChange}
            value={account.sourceOfFunds}
          />
        </div>

        <div className="form-group">
          <label>Purpose</label>
          <input
            type="text"
            name="purpose"
            className="form-control"
            onChange={handleChange}
            value={account.purpose}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
        >
          Create Account
        </button>

      </form>
    </div>
  </div>
);
}

export default CreateAccount;