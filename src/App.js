import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import AuthLogin from "./components/AuthLogin";
import Home from "./components/Home";

function App() {
  const[name, setCode] = useState('')
  let navigate = useNavigate();

  useEffect(() => {
    setCode(localStorage.getItem("name"));
    if (name) {
      return navigate("/");
    } else {
      return navigate("/login")
    }
  }, [name]);
  

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthLogin />} />
      </Routes>
  );
}

export default App;
