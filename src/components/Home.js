import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";

export default function Home({ guest }) {
  const [named, setNamed] = useState("");
  const [active, setActive] = useState(true);
  const [activesessions, setActivesessions] = useState([]);
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    let abc = location.state;
    let activeSessn = JSON.parse(localStorage.getItem("allUsers"));
    let sess = [];

    for (let i in abc) {
      setNamed(abc[i]);
    }

    for (let i in activeSessn) {
      sess.push(activeSessn[i].username);
    }
    setActivesessions(sess);
  }, [location]);

  const activeUsers = (arr) => {
    const name = sessionStorage.getItem("name");
    let index;
    for (let i in arr) {
      if (name === arr[i].username) {
        index = i;
      }
    }
    arr.splice(index, 1);
    return arr;
  };
  const onLogout = () => {
    let previousUsers = JSON.parse(localStorage.getItem("allUsers"));
    if (previousUsers.length > 1) {
      let presentUsers = activeUsers(previousUsers);
      localStorage.setItem("allUsers", JSON.stringify(presentUsers));
    } else if (previousUsers.length === 1) {
      localStorage.removeItem("allUsers");
    }

    sessionStorage.removeItem("name");
    navigate("/login");
  };

  const onNewLogin = () => {
    onLogout();
    window.open(String(process.env.REACT_APP_REDIRECT_URI), "_self").focus();
  };
  const mOut = () => {
    setTimeout(() => setActive(false), 60000);
  };
  const mOver = () => {
    setActive(true);
  };

  return (
    <div className="bt__home" onMouseOut={mOut} onMouseOver={mOver}>
      <div className="bt__home-content">
        <div className="bt__home-content__text">
          <h1>Welcome, {guest || named}</h1>
          <button>{active ? "Active" : "Idle"}</button>
        </div>
        <div className="bt__home-content__sess"> {activesessions.length > 1 && "Other active sessions are:"}
          {activesessions.map((item, index) => (
            ((guest || named) !== item) && <li key={index}>Username {item}</li>
          ))}
        </div>
        <div className="bt__home-content__btns">
          <button onClick={onLogout}>Logout</button>
          <button onClick={onNewLogin}> Login differently</button>
        </div>
      </div>
    </div>
  );
}
