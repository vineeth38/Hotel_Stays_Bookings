import { useState,useEffect,useContext } from "react";
import { useParams,useSearchParams,useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
export const PaymentVerification = ()=>{
    const {id} = useParams();
    const [searchParam] = useSearchParams();
    const destination = searchParam.get("destination");
    const [hotel_details,setHotel_details] = useState(null);
    const [otp,setOtp] = useState("")
    const navigate = useNavigate()
    const {searchParams} = useContext(UserContext)
    useEffect(()=>{
        axios.get("https://vineeth38.github.io/Recipes_apis/hotels_details.json").then(res=>{
            const data = res.data;
            const cityData = data[destination?.toLowerCase()?.trim()]
            const hotel = cityData.find((h)=>h.id === parseInt(id));
            console.log(hotel)
            setHotel_details(hotel)
        })
    },[id])
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(searchParams.checkIn)
    const check_In= new Date(searchParams.checkIn).toISOString().split("T")[0];
    const check_Out = new Date(searchParams.checkOut).toISOString().split("T")[0];
    console.log(check_In)
    console.log(hotel_details)
    const bookings_data = {
      "user":user["id"],
      "hotel_name":hotel_details?.name,
      "check_in":check_In,
      "check_out":check_Out,
      "room_type":searchParams.rooms,
      "total_price":hotel_details?.price,
      "city":destination,
      "dp":hotel_details?.dp
    }
    console.log(user["id"])
    const Confirm = async()=>{
       if(otp=="369258"){
        try{
        const response = await axios.post("https://hotel-stays-booking.onrender.com/booking/create/",
          bookings_data,
          { headers: { "Content-Type": "application/json" }}
        ).then((res)=>{
          console.log(res)
          alert("Hurrah, booking confirmed")
        navigate("/Bookings")
        })
        
        }catch (error) {
              console.error("❌ Full Axios error:", error);
              alert("Error occured")
              if (error.response) {
                  console.log("🔹 Response data:", error.response.data);
    console.log("🔹 Status:", error.response.status);
    alert("Error occured")
  } else if (error.request) {
    console.log("🔹 No response received:", error.request);
    alert("Error occured")
  } else {
    console.log("🔹 Error message:", error.message);
    alert("Error occured")
  }
}
       }
    }
    const resend = ()=>{
      setTimeout(()=>{
        alert("OTP resent to your registered mobile number")
      },3000)
    }
    const cancel = ()=>{
      confirm("Are you sure you want to cancel the booking")
      if(confirm){
        navigate("/")
      }
    }
    return <>
      <div className="paymentVerify-container">
      <div >
        <div className="bank-logos">
          <img src="https://accosa-ivs.s3.ap-south-1.amazonaws.com/accosa-ivs/v1/participant/kotdb/images/kotdb_logo.jpg" alt="" />
          <img src="https://accosa-ivs.s3.ap-south-1.amazonaws.com/accosa-ivs/v1/emv/visa/images/visa_logo.jpg" alt="" />
        </div>
        <p style={{marginTop:"30px"}}>Your OTP was successfully sent to your registered mobile number.</p>
        <label htmlFor="otp">Enter the code here</label>
        <input type="text" required maxLength="6" style={{width:"100%"}} id="verfication" onChange={(e)=>setOtp(e.target.value)}/>
        <h5 id="cnfrm-btn" onClick={Confirm}>CONFIRM</h5>
        <div className="optional-btns">
          <h5 onClick={resend}>RESEND</h5>
          <h5 onClick={cancel}>CANCEL</h5>
        </div>
        <p>Note :SMS OTP sending is disabled because service is not free please enter 369258 to confirm booking</p>
        <img src="https://accosa-ivs.s3.ap-south-1.amazonaws.com/accosa-ivs/v1/common/images/wibmo_logo.png" alt="" id="wibmo"/>
      </div>
      </div>
   
    </>
}