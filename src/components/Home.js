import React, {useEffect, useState} from 'react'
import {useNavigate, useLocation} from "react-router-dom";
import "./Home.css"

export default function Home({guest}) {
    const[named, setNamed] = useState("")
    let navigate = useNavigate()
    let location = useLocation();

    useEffect(() => {
        let abc = location.state
        for (let i in abc){
            setNamed(abc[i])
        }
    }, [location]);

    const activeUsers = (arr) => {
        const name = sessionStorage.getItem('name')
        const value = {username: String(name)}
        const index = arr.indexOf(value);
        arr.splice(index, 1)
        return arr;
    }
    const onLogout = () => {
        let previousUsers = JSON.parse(localStorage.getItem("allUsers"))
        if (previousUsers.length > 1) {
            let presentUsers = activeUsers(previousUsers)
            localStorage.setItem("allUsers", JSON.stringify(presentUsers))
        } else if (previousUsers.length === 1) {
            localStorage.removeItem('allUsers');
        }

        sessionStorage.removeItem('name');
        navigate('/login');
    }
    
    const onNewLogin = () => {
        onLogout();
        window.open(String(process.env.REACT_APP_REDIRECT_URI), "_blank").focus()
    }

    return (
        <div className="bt__home">
            <h1>Welcome, {guest || named}</h1>
            <div className="bt__home-btns" >
                <button onClick={onLogout}>Logout</button>
                <button onClick={onNewLogin}> Login differently</button>
            </div>
        </div>
    )
}