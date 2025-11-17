// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState,useContext } from "react";
import './navbar.css'
import { Favorites } from './nav-links/Favorites';
import { Bookings } from './nav-links/Bookings';
import { Login } from './nav-links/Login';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Destination } from './nav-links/Destination';
import { Signup } from './nav-links/Signup';
import { Otp } from './nav-links/Otp';
import { Navbar } from "react-bootstrap";
import { UserContext } from "./UserContext";
import trivagoLogo from './assets/trivago.png';
export const NavSec = ()=>{
    const navigate = useNavigate();
    const { setShowdestination,userName, setUserName } = useContext(UserContext);
    useEffect(()=>{
       const user = localStorage.getItem("user");
       if (user){
        const userObj = JSON.parse(user);
        setUserName(userObj.name)
        console.log(userName)
       }
    },[userName])
    const handleLoginLogout = async() => {
        if(userName){
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout){
            // localStorage.removeItem("user")
            // localStorage.removeItem("token")
            // setUserName("");
            // alert("You have been logged out");
            await fetch("http://127.0.0.1:8000/logout/", {
                  method: "POST",
                  credentials: "include" // Important to send cookies
                    }).then(res => res.json()).then(data => {
                console.log(data.message);
                localStorage.removeItem("user");
               localStorage.removeItem("refresh");
               localStorage.removeItem("access");
               setUserName("");
               alert("You have been logged out");
                });
        }
        }else{
           navigate("/Login"); 
        }
    }
    const handleHome = ()=>{
        setShowdestination(false)
    };
    return <>
    <nav className="Container">
        <nav className='navbar'>
        {/* <h3>Trivago</h3> */}
        <img src={trivagoLogo} alt="" />
        <div className="menu">
            <nav>
                <Link to="/" onClick={handleHome}>Home</Link>
                {/* <Link to="/Favorites">Favorites</Link> */}
                <Link to="/Bookings">Bookings</Link>
                {/* <Link to="/Login">Login</Link> */}
                
                {userName ? (
                    <span id="user">{userName}</span>
                ) : null}
                <button onClick={handleLoginLogout}>
          {userName ? "Log Out" : "Login"}
        </button>
             </nav>
        </div>
        </nav>
    </nav>
    </>
}