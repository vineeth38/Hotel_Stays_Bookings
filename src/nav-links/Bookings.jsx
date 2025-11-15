import axios from "axios"
import {useState,useEffect,useContext} from "react"

export const Bookings = ()=>{
    const [bookings,setBookings] = useState(null)
    // const access = Cookies.get("access");
    useEffect(()=>{
        async function fetchData(){
           const response = await axios.get("https://hotel-stays-booking.onrender.com/get_bookings/")
        setBookings(response.data.bookings)
        }
        fetchData()
    },[])
    console.log(bookings)
    return <>
    <div className="bookings-container">{
      bookings?.map((booking)=>(
       <div key={booking.id}>
        <div className="himage">
         <img src={booking?.dp} alt="" />
        </div>
      <div>
        <h4>{booking?.hotel_name}</h4>
        <h5>{booking?.city}</h5>
        <div className="InOut">
          <div className="checkIn">
            <p>Check In</p>
            <h6>{booking?.check_in}</h6>
          </div>
          <div className="checkOut">
            <p>Check Out</p>
            <h6>{booking?.check_out}</h6>
          </div>
        </div>
        <h4>₹ {booking?.total_price}</h4>
      </div>
    </div>
      ))}
    </div>
    </>
}