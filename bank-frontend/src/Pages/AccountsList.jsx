import React, { useEffect, useState } from "react";
import axios from "axios";
import './AccountList.css'
function AccountList() {

    const [accounts, setAccounts] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        axios.get(
            `http://localhost:8080/api/accounts/user/${user.fullName}`
        )
        .then((response) => {
            setAccounts(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

    }, []);

    return (
       <div className="accounts-container">
  <h2>My Accounts</h2>

  <div className="table-card">
    <table className="accounts-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Currency</th>
          <th>Balance</th>
          <th>Source Of Funds</th>
          <th>Purpose</th>
        </tr>
      </thead>

      <tbody>
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <tr key={account.accountId}>
              <td>{account.accountId}</td>
              <td>{account.accountHolderName}</td>
              <td>{account.accountType}</td>
              <td>{account.currency}</td>
              <td>₹{account.initialDeposit}</td>
              <td>{account.sourceOfFunds}</td>
              <td>{account.purpose}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="no-data">
              No Accounts Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
    );
}

export default AccountList;