// import { useState } from 'react'
// import './App.css'
// import { NavSec } from './Navbar.jsx'
// function App() {
  

//   return (
//     <>
//       <NavSec />
//     </>
//   )
// }
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavSec } from "./Navbar";
import { Home } from "./Home";
import { Favorites } from "./nav-links/Favorites";
import { Bookings } from "./nav-links/Bookings";
import { Login } from "./nav-links/Login";
import { Destination } from "./nav-links/Destination";
import { Signup } from "./nav-links/Signup";
import { Otp } from "./nav-links/Otp";
import { UserProvider } from "./UserContext";
import { Search } from "./nav-links/Search";
import { Hotel } from "./hotel/hotel";
import { useLocation } from "react-router-dom";
import { HotelProceding } from "./hotel/HotelProceding";
import { Payments } from "./hotel/Payments";
import { PaymentVerification } from "./hotel/PaymentVerification";
function AppWrapper() {
  return (
    <BrowserRouter>
      <UserProvider>
        <App/>
      </UserProvider>
    </BrowserRouter>
  );
}

function App() {
   const location = useLocation();
  const hideSearchRoutes = ["/Login", "/Signup", "/Otp","/Bookings","/Payments","/PaymentVerification"];
  // const showSearch = !hideSearchRoutes.includes(location.pathname);
  const showSearch = !hideSearchRoutes.some(path => location.pathname.startsWith(path));

  return (
    <>
    {/* // <BrowserRouter>  */}
    {/* // <UserProvider> */}
      <NavSec />
      {showSearch && <Search />}
      {/* <Search /> */}
      <Routes>
        {/* <Route path="/" element={<Search />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/Bookings" element={<Bookings />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Destination" element={<Destination />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Otp" element={<Otp />} />
        <Route path='/hotel/:id' element = {<Hotel />} />
        <Route path='/HotelProceding/:id' element={<HotelProceding />} />
        <Route path="/Payments/:id" element={<Payments />} />
        <Route path='/PaymentVerification/:id' element={<PaymentVerification />} />
      </Routes>
      {/* // </UserProvider> */}
    {/* // </BrowserRouter> */}
    </>
  );
}


export default AppWrapper
