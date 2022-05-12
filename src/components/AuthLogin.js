import React, {useState } from "react";
import {useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import './AuthLogin.css'

export default function AuthLogin() {
  const [ username, setUsername ] = useState("")
  let navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    sessionStorage.setItem("sessionId", uuidv4())
    sessionStorage.setItem("name", username)
    setUsername("")
    navigate("/")
  }
  const handleChange = (evt) => {
    setUsername(evt.target.value)
  }

  return (
    <div>
        <form onSubmit={handleSubmit}> 
            <label htmlFor="uname">Username</label><br></br>
            <input className=""
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
