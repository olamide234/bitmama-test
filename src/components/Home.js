import React from 'react'
import {useNavigate} from "react-router-dom";
import "./Home.css"

export default function Home() {
    let navigate = useNavigate()

    const onLogout = () => {
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('sessionId')
        navigate('/login')
    }
    
    return (
        <div>
            <h1>Welcome, Guest</h1>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}
