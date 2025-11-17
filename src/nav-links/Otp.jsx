// import { Container } from "react-bootstrap"

// import React, { useState,useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { UserContext } from "../UserContext";
// export const Otp = ()=>{
//     const [otp,setOtp] = useState("")
//     const [message, setMessage] = useState("");
//     const location = useLocation(); 
//     const email = location.state?.email || "";
//     const navigate = useNavigate();
//     const { setUser,user,userName, setUserName } = useContext(UserContext);
//     const handleSubmit = async(e)=>{
//        e.preventDefault();
//        const verification_data={
//         "email":email,
//         "otp":otp
//        }
//        console.log(verification_data)
//        try{
//               const response = await axios.post(
//                     "http://127.0.0.1:8000/verifyOtp/",
//                     verification_data,
//                  {
//                   withCredentials: true
//                  } 
//                 )
//                 const response_data=response.data
//                 console.log(response.data);
//                  localStorage.setItem("access", response.data.access);
//                  localStorage.setItem("refresh",response.data.refresh)
//                 localStorage.setItem("user", JSON.stringify(response.data.user));
//                 setUser(JSON.parse(localStorage.getItem("user")));
//                 setUserName(user.name)
//                 alert("Successfully registered")
//                 // navigate('/', { state: { response_data } })
//                 navigate('/')
//         }
//         // catch(error){
//         //         if(error.response){
//         //             setMessage(error.response.data.message || JSON.stringify(error.response.data));
//         //             console.log(message)
//         //         }else{
//         //             setMessage("something went wrong")
//         //             console.log(message)
//         //         }
//         //        }
//         //       }
//         catch (error) {
//   console.log("🔹 Full Axios Error:", error);
//   if (error.response) {
//     console.log("🔹 Response data:", error.response.data);
//     console.log("🔹 Status:", error.response.status);
//   } else if (error.request) {
//     console.log("🔹 No response received:", error.request);
//   } else {
//     console.log("🔹 Error message:", error.message);
//   }
// }
//     }
//     return <div className="otp-Container">
//       <form action="" id="otp-form">
//         <label htmlFor="otp">Enter the OTP you received in your email</label>
//       <input type="text" name="otp" placeholder="Enter your OTP" onChange={(e)=>setOtp(e.target.value)} value={otp} required/>
//       <button type="submit" onClick={handleSubmit} id="lgn-btn">Verify</button>
//       </form>
//     </div>
//  }
