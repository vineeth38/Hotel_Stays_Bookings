import { useState,useEffect } from "react";
import { useParams,useSearchParams,Link,useNavigate } from "react-router-dom";
import axios from "axios";
export const Hotel = ()=>{
     const { id } = useParams();
     const [searchParams] = useSearchParams();
     const destination = searchParams.get("destination");
     const [hotel_details,setHotel_details] = useState(null);
     const navigate = useNavigate(); 
     useEffect(()=>{
        axios.get("https://vineeth38.github.io/Recipes_apis/hotels_details.json").then(res=>{
          const data = res.data;
        //  Safe fallback to "for all" if destination invalid or missing
        const cityData = data[destination?.toLowerCase()?.trim()] || data["for all"];
        const hotel = cityData.find((h) => h.id === parseInt(id));
        setHotel_details(hotel);
        })
     },[id])
     console.log(hotel_details)
     const BookNow = async(hotel_details)=>{
          try{
                 const token = localStorage.getItem("access");
         //      console.log(token)
          //      const res = await axios.get("http://127.0.0.1:8000/auth/check/",{
          //           withCredentials:true,
          //          
               // headers: {
          //       Authorization: `Bearer ${token}`
          //   }
          //      });
          //      if (res.data.auth === true){
          //           navigate(`/HotelProceding/${hotel_details.id}?destination=${destination}`)
          //      }
          // }catch(err){
          //      alert("Please Login First!");
          //      navigate("/Login");
          // }
          // const token = localStorage.getItem("access");
          // console.log(token)
    if (!token) {
      alert("Please login first!");
      navigate("/Login");
      return;
    }

    // 2️ Send it in Authorization header
    const res = await axios.get("https://hotel-stays-booking.onrender.com/auth/check/", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 3️ If backend confirms user is authenticated
    if (res.data.auth === true) {
      navigate(`/HotelProceding/${hotel_details.id}?destination=${destination}`);
    }
  } catch (err) {
    console.error("Auth check failed:", err);
    alert("Please login first!");
    navigate("/Login");
  }
          
     }
     return <>
     <div className="htl-container">
          <div className="left-section">
               <h4>{hotel_details?.name}</h4>
               <p>{hotel_details?.heading}</p>
               <div className="htl-images">
                    {hotel_details?.images.map((url, index) => (
    <img key={index} src={url} alt={`Hotel image ${index + 1}`} />
  ))}
               </div>
          </div>
          <div className="right-section">
               <div className="right-top">
             <h4 style={{fontWeight:900}}>Premium Suite with Twin Bed</h4>
             <p>Fits 2 Adults</p>
             <ul>
               <li>21% longstay discount included</li>
               <li>Non-Refundable</li>
             </ul>
             <p><s>{hotel_details?.price+2000}</s> Per Night: </p>
             <h4 style={{fontWeight:900}}>₹ {hotel_details?.price} <i style={{fontWeight:400, fontSize:"18px"}}>+ ₹ 392 taxes & fees</i></h4>
             <p id="bkNwbtn" onClick={()=>BookNow(hotel_details)}>Book Now</p>
             </div>
             <div className="right-bottom">
               <div className="ratings">
                    <p id="rating">{hotel_details?.Rating}</p>
                    <p id="review">{hotel_details?.Review} <span style={{color:"grey"}}>({hotel_details?.price-1687})</span></p>
                    <p style={{color:"dodgerblue",fontSize:"18px"}}>All Reviews</p>
               </div>
               <hr/>
               <div className="location">
                    <img src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/map-icon-dtls.png" alt="" style={{width:"75px"}}/>
                    <h5>{hotel_details?.location}</h5>
               </div>
             </div>
          </div>
          </div>
          <div className="amenties">
            <h4>Amenities</h4>
            
          <div>
               {hotel_details?.benefits.map((b,i)=>(
                    <ul>
                         <li key={i}>{b}</li>
                    </ul>
               ))}
          </div>
            
          </div>
          <div className="about-P">
               <h3>About Property</h3>
               <div>{hotel_details?.highlights.map((p,i)=>(
                              <ul>
                                   <li key={i}>{p}</li>
                              </ul>
                         ))
                    }
               </div>
          </div>
     </>
}   