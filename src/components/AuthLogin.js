import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./AuthLogin.css";

export default function AuthLogin(props) {
  const [username, setUsername] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const nameLowerCase = username.toLowerCase();

    sessionStorage.setItem("name", nameLowerCase);

    if (localStorage.getItem("allUsers")) {
      let index;
      let previousUsers = JSON.parse(localStorage.getItem("allUsers"));

      for (let i in previousUsers) {
        // remove the previous username on localstorage to prevent duplicates
        if (nameLowerCase === previousUsers[i].username) {
          index = i;
          //   window.open(String(process.env.REACT_APP_REDIRECT_URI)).focus();
        }
      }
      previousUsers.splice(index, 1);

      previousUsers.push({ username: nameLowerCase });
      localStorage.setItem("allUsers", JSON.stringify(previousUsers));
    } else {
      localStorage.setItem(
        "allUsers",
        JSON.stringify([{ username: nameLowerCase }])
      );
    }

    setUsername("");
    navigate("/", { state: { name: nameLowerCase } });
  };

  const handleChange = (evt) => {
    setUsername(evt.target.value);
  };

  return (
    <div className="bt__authLogin">
      <form onSubmit={handleSubmit}>
        <label htmlFor="uname">Username</label>
        <br></br>
        <input
          className=""
          id="uname"
          name="uname"
          type="text"
          required
          placeholder="Enter username..."
          value={username}
          onChange={handleChange}
        />
        <button> LOGIN</button>
      </form>
    </div>
  );
}
