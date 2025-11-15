import { useState,useEffect,useContext } from "react";
import { useParams,useSearchParams,useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import styles from './HotelProceding.module.css';
import { FaMapLocationDot } from "react-icons/fa6";
import axios from "axios";
export const HotelProceding = ()=>{
    const {id} = useParams();
    const [searchParam] = useSearchParams();
    const destination=searchParam.get("destination")
    const [hotel_details,setHotel_details] = useState(null);
    const {searchParams} = useContext(UserContext)
    const navigate =  useNavigate()
    useEffect(()=>{
        axios.get("https://vineeth38.github.io/Recipes_apis/hotels_details.json").then(res=>{
            const data = res.data;
            const cityData = data[destination?.toLowerCase()?.trim()]
            const hotel = cityData.find((h)=>h.id === parseInt(id));
            setHotel_details(hotel)
        })
    },[id])
    const handlePayment = ()=>{
      navigate(`/Payments/${id}?destination=${destination}`)
    }
         return <>
         <div className="review-container">
            <h3>Review your Booking</h3>
            <div className="hotel-card2">
             <img src={hotel_details?.dp} alt="" />
             <div>
                <h5>{hotel_details?.name}</h5>
                <p><FaMapLocationDot /> {hotel_details?.location}</p>
                <div className="ratings">
                    <p id="rating">{hotel_details?.Rating}</p>
                    <p id="review">{hotel_details?.Review} <span style={{color:"grey"}}>({hotel_details?.price-1687})</span></p>
                    <p style={{color:"#2757ae",fontSize:"18px"}}> Rating</p>
               </div>
             </div>
            </div>
            <div className="room">
                <div className="cild">
                    <p>Check In</p>
                    <p><strong>{searchParams.checkIn.toString().slice(0,16)}</strong></p>
                    <p>{parseInt(searchParams.checkIn.toString().slice(16,18))<12 ? searchParams.checkIn.toString().slice(16,18) : parseInt(searchParams.checkIn.toString().slice(16,18)) - 12 } {parseInt(searchParams.checkIn.toString().slice(16,18))<12 ? "AM" : "PM"}</p>
                </div>
                <div className="cild">
                    <p>Check Out</p>
                    <p><strong>{searchParams.checkOut.toString().slice(0,16)}</strong></p>
                    <p>{parseInt(searchParams.checkOut.toString().slice(16,18))<12 ? searchParams.checkOut.toString().slice(16,18) : parseInt(searchParams.checkOut.toString().slice(16,18)) - 12 } {parseInt(searchParams.checkOut.toString().slice(16,18))<12 ? "AM" : "PM"}</p>
                </div>
                <div className="cild">
                    <p>Rooms</p>
                    <p><strong>{searchParams.rooms} </strong></p>
                   <br style={{marginTop:"15px"}}/>
                </div>
            </div>
            <div className="price_details">
                <h4><strong>Price Summary</strong></h4>
                <div>
                    <div className="priceText">
                        <p>Base price</p>
                        <p>Taxes & Service Fees</p>
                        <p><strong>Total Amount to be paid</strong></p>
                    </div>
                    <div className="price">
                        <p>₹{hotel_details?.price}</p>
                        <p>₹392</p>
                        <p><strong>₹{parseInt(hotel_details?.price)+392}</strong></p>
                    </div>
                </div>
                <h3 onClick={handlePayment}>Proceed To Payment</h3>
            </div>
         </div>
         
         </>
}