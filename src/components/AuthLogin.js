import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import './AuthLogin.css'

export default function AuthLogin() {
  const [ username, setUsername ] = useState("")
  let navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const nameLowerCase = username.toLowerCase()

    sessionStorage.setItem("name", nameLowerCase)

    // if (localStorage.getItem("allUsers")) {
    //     let previousUsers = JSON.parse(localStorage.getItem("allUsers"))
        
    // }

    if (localStorage.getItem("allUsers")) {
        let previousUsers = JSON.parse(localStorage.getItem("allUsers"))
        // console.log(previousUsers)
        // console.log(previousUsers.length)

        for (let user of previousUsers) {
            if (user.username === nameLowerCase){
                // remove the previous username on localstorage to prevent duplicates
                window.open(String(process.env.REACT_APP_REDIRECT_URI)).focus()
            }
        }

        previousUsers.push({username: nameLowerCase})
        localStorage.setItem("allUsers", JSON.stringify(previousUsers))
    } else {
        localStorage.setItem("allUsers", JSON.stringify([{username: nameLowerCase}]))
    }

    setUsername("")
    navigate("/")
  }

  const handleChange = (evt) => {
    setUsername(evt.target.value)
  }

  return (
    <div className="bt__authLogin">
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
