import {useState,useEffect,useContext} from "react"
import { Destinations } from "./destinations";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import AOS from 'aos';
import axios from "axios";
import 'aos/dist/aos.css';
export const Home = ()=>{
    const [rhotels,setRhotels] = useState(null);
    const {searchParams,setSearchParams} = useContext(UserContext);
    const navigate = useNavigate()
    const today = new Date();
   const tomorrow = new Date();
   tomorrow.setDate(today.getDate() + 1);
    useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true,    // Whether animation should happen only once - while scrolling down
    });
  }, []);
  useEffect(()=>{
    axios.get("https://vineeth38.github.io/Recipes_apis/hotels_details.json").then((res)=>{
      console.log(res.data)
      setRhotels(res.data)
    })
  },[])
  useEffect(()=>{
     setSearchParams({
      destination: searchParams.destination || "",
      checkIn: searchParams.checkIn || today,
      checkOut: searchParams.checkOut || tomorrow,
      rooms: searchParams.rooms || 1
   });
  },[])
  const handleCardClick = (hotel) => {
    navigate(`/hotel/${hotel.id}?destination=${hotel.city}`);
  };
  const handleCityCard = (City)=>{

    const checkIn = searchParams.checkIn ? new Date(searchParams.checkIn) : today;
  const checkOut = searchParams.checkOut ? new Date(searchParams.checkOut) : tomorrow;
  const rooms = searchParams.rooms || 1;

  const query = new URLSearchParams({
    city: City.City,
    checkIn: checkIn.toISOString().split("T")[0],
    checkOut: checkOut.toISOString().split("T")[0],
    rooms
  }).toString();
    navigate(`/destination?${query}`);
  }
    return <>
    {/* <h3>Best Recommended hotels to stay</h3> */}
    <h3 style={{marginLeft:"12%",fontFamily:"Times New Roman"}} id="h3"><i>Most Recommended Popular Choices</i> </h3>
    <div className="recommended">{
      rhotels?.recommended.map((hotel)=>(
          <div className="rhotel-card" onClick={()=>handleCardClick(hotel)}>
       <div>
        <img src={hotel.dp} alt="" />
       </div>
       <h4>{hotel.name}</h4>
       <p>{hotel.highlights[0]}</p>
       </div>
      ))
      }
    </div>
    {/* <div className="Offer-container">
    <div className="test">
      <h3>Special Hotel Offers</h3>
      </div>
      <div className="offers">
        <div className="offer1">
          <img src="https://ns.yatracdn.com/strapi/qa/Federal_CC_14b030b8cc.jpg" alt="federal" />
          <div className="offer_details">
            <h3>Up to 35% OFF (max. Rs.5,000)</h3>
            <p>On Domestic Hotels</p>
            <p>*Offer Valid on Federal Bank Credit Card EMI Transactions Only</p>
            <span className="coupon">FEDEMI</span>
          </div>
          </div>
          <div className="offer1">
          <img src="https://ns.yatracdn.com/strapi/qa/RBL_EMI_Hotel_fe541b5230.jpg" alt="RBL" />
          <div className="offer_details">
            <h3>Flat 15% OFF (up to Rs.5,000)</h3>
            <p>On Domestic Hotels</p>
            <p>*Offer Valid on RBL Bank Credit Card EMI Transactions Only</p>
            <span className="coupon">YTRBLEMI</span>
          </div>
          </div>
          <div className="offer1">
          <img src="https://ns.yatracdn.com/strapi/qa/YTUPI_3d58b4695a.jpg" alt="YT" />
          <div className="offer_details">
            <h3>Up to 25% Off</h3>
            <p>On Domestic Hotels</p>
            <p>*Offer Valid on UPI Transactions Only</p>
            <span className="coupon">YTUPI</span>
          </div>
          </div>
      </div>  */}
      {/* </div> */}
      {/* <center> */}
      <div className="Mcities">
      <div className="cities-container">
        <div className="test">
        <h3>Popular Destinations</h3>
        <p>We have selected best hotels in these locations around the world for you</p>
      </div>
  {Destinations.map((city) => (
    <div className="city" key={city.id} data-aos="zoom-in-up" onClick={()=>handleCityCard(city)}>
      <img src={city.image} alt="" />
      <div className="discription">
       <h3>{city.City}</h3>
      <p>{city.description}</p>
      </div>
    </div>
  ))}
</div>
</div>
{/* </center> */}
    </>
}