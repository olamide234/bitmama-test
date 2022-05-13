import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import AuthLogin from "./components/AuthLogin";
import Home from "./components/Home";

function App() {
  const[name, setName] = useState('')
  let navigate = useNavigate();

  useEffect(() => {
    setName(sessionStorage.getItem("name"));
    if (name) {
      return navigate("/");
    } else {
      return navigate("/login")
    }
  }, [name]);
  

  return (
      <Routes>
        <Route path="/" element={<Home guest={name}/>} />
        <Route path="/login" element={<AuthLogin />} />
      </Routes>
  );
}

export default App;
