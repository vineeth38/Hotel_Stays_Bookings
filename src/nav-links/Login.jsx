

import { Link,useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
export function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate = useNavigate();
  const { setUser,user,userName, setUserName } = useContext(UserContext);
  const credentials = async(e)=>{
    e.preventDefault();
    const loginData = { "email":email, "password":password };
    console.log(loginData.email)
    const response = await fetch("https://hotel-stays-booking.onrender.com/login/",
      {
      method:"POST",
      body: JSON.stringify(loginData),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
       });
    const result = await response.json();
    console.log(result)
    if(result.user){
    localStorage.setItem("refresh", result.refresh);
    localStorage.setItem("access",result.access)
    localStorage.setItem("user", JSON.stringify(result.user));
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(user)
    setUserName(result.user.name)
    alert("Login Successfully")
    navigate('/')
    }
  }
  return <div className="Login-container">
    <form action="" id="login-form">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} value={password} required/>
        <button type="submit" onClick={credentials} id="lgn-btn">Login</button>
        <p>Do not have an account ? <Link to="/Signup" style={{textDecoration:"none"}}>Signup</Link> here</p>
    </form>
  </div>
  
}
