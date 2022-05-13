import React from 'react'
import {useNavigate} from "react-router-dom";
import "./Home.css"

export default function Home({guest}) {
    // const[guest, setGuest] = useState("Guest")
    let navigate = useNavigate()

    const activeUsers = (arr) => {
        const name = sessionStorage.getItem('name')
        let value = {username: String(name)}
        console.log(value)
        return arr.filter(item => item !== {username: String(name)})
        // return value !== {username: name}
    }
    const onLogout = () => {
        let previousUsers = JSON.parse(localStorage.getItem("allUsers"))
        // const value = sessionStorage.getItem('name')
        // {previousUsers.map(item => {
        //     console.log({item})
        // })}
        console.log(typeof(previousUsers))
        if (previousUsers.length > 1) {
            let presentUsers = activeUsers(previousUsers)
            console.log(presentUsers)

            localStorage.setItem("allUsers", JSON.stringify(presentUsers))
        } else if (previousUsers.length == 1) {
            localStorage.removeItem('allUsers');
        }

        sessionStorage.removeItem('name');
        
        // localStorage.removeItem('name');
        // sessionStorage.removeItem('sessionId');
        navigate('/login');
    }

    return (
        <div className="bt__home">
            <h1>Welcome, {guest}</h1>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}
