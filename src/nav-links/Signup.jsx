
import { Link } from "react-router-dom";
import React, { useState ,useContext} from "react";
import { useAccordionButton } from "react-bootstrap";
import axios from "axios";
import { Otp } from "./Otp";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
export const Signup = ()=>{
    const [email,setEmail]=useState("")
    const [name,setName] = useState("")
    const [city,setCity]=useState("")
    const [mobile,setMobile]=useState("")
    const [createpassword,setCreatepassword]=useState("")
    const [password,setPassword]=useState("")
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { setUser,user,userName, setUserName } = useContext(UserContext);
    const handleSubmit = async(e)=>{
         e.preventDefault();
         if (createpassword == password){
           const formData = {
                  name,
                  email,
                  password,
                  city,
                  mobile,
                  };

               try{
                const response = await axios.post(
                    "http://127.0.0.1:8000/Signup/",
                    formData,
                     { headers: { "Content-Type": "application/json" }}
                );
                // setMessage(response.data.message || JSON.stringify(response.data))
                const response_data=response.data
                console.log(response.data)
                console.log(email)
                 localStorage.setItem("access", response.data.access);
                 localStorage.setItem("refresh",response.data.refresh)
                localStorage.setItem("user", JSON.stringify(response.data.user));
                setUser(JSON.parse(localStorage.getItem("user")));
                setUserName(user.name)
                alert("Successfully registered")
                // navigate('/', { state: { response_data } })
                navigate('/')
                // navigate('/Otp', { state: { email } })
               }catch (error) {
              console.error(" Full Axios error:", error);
              if (error.response) {
                  console.log(" Response data:", error.response.data);
    console.log(" Status:", error.response.status);
  } else if (error.request) {
    console.log(" No response received:", error.request);
  } else {
    console.log(" Error message:", error.message);
  }
}
     
         }
         else{
            alert("create password and confirm password should be same")
         }
    } 
    return <div className="SignUp-container">
        <form action="" id="SignUp-form">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder="Enter your Name" onChange={(e)=>setName(e.target.value)} value={name} required/>
            <label htmlFor="city">City</label>
            <input type="text" name="city" placeholder="Enter your City" onChange={(e)=>setCity(e.target.value)} value={city} required/>
            <label htmlFor="password">Mobile</label>
            <input type="text" name="mobile" placeholder="Enter your Mobile" onChange={(e)=>setMobile(e.target.value)} value={mobile} required/>
            <label htmlFor="createpassword">Create Password</label>
            <input type="password" name="createpassword" placeholder="Enter your password" onChange={(e)=>setCreatepassword(e.target.value)} value={createpassword} required/>
            <label htmlFor="password">Confirm Password</label>
            <input type="password" name="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} value={password} required/>
            <button type="submit" onClick={handleSubmit} id="lgn-btn">Sign up</button>
            <p>Already have an account ? <Link to="/Login" style={{textDecoration:"none"}}>Login</Link> here</p>
        </form>
      </div>
}