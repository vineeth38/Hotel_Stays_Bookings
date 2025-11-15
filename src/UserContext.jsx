import {createContext,useState} from "react";
export const UserContext = createContext();
export const UserProvider = ({ children })=>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [showDestination,setShowdestination] = useState(false);
    const [hotelData, setHotelData] = useState({});
      const [userName, setUserName] = useState("");
    const [searchParams, setSearchParams] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    rooms: 1
  });
    return (
        <UserContext.Provider value={{user, setUser, showDestination, setShowdestination,hotelData,setHotelData,searchParams,setSearchParams,userName, setUserName}} >
            {children}
        </UserContext.Provider>
    )
}