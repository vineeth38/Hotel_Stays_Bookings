import {useState,useEffect,useContext} from "react"
import { useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaUserFriends } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Destination } from "./Destination";
import { Home } from "../Home";
export const Search = ()=>{
  const {searchParams,setSearchParams} = useContext(UserContext);
  const [destination, setDestination] = useState(searchParams.destination);
  const [checkIn, setCheckIn] = useState(searchParams.checkIn ? new Date(searchParams.checkIn) : new Date());
  const [checkOut, setCheckOut] = useState(()=>{
    if (searchParams.checkOut) return new Date(searchParams.checkOut);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
  });
  const [rooms, setRooms] = useState(searchParams.rooms || 1);
  const navigate = useNavigate();
  const { user,showDestination, setShowdestination } = useContext(UserContext); 
  const [welcomeMsg, setWelcomeMsg] = useState(""); 
  useEffect(() => {
    if (user) {
      setWelcomeMsg(`Welcome, ${user.name}!`);
    } else {
      setWelcomeMsg("Welcome, Guest!");
    }
  }, [user]);  
  const handleData = (e)=>{
    e.preventDefault();
    console.log(destination,rooms)
    console.log(checkIn)
    console.log(checkOut)
     if (!destination || !checkIn || !checkOut || !rooms) {
      alert("Enter all fields");
      return;
    }
    setSearchParams({
      destination,
      checkIn: checkIn,
      checkOut: checkOut,
      rooms
    })
    const query = new URLSearchParams({
      city: destination,
      checkIn: checkIn.toISOString().split("T")[0],
      checkOut: checkOut.toISOString().split("T")[0],
      rooms
    }).toString();
    navigate(`/destination?${query}`);
    };
    // navigate("/Destination")
  
    return <>
    <center><h3>Book Hotels and Homestays</h3> </center>
    <div className="content">
    <div className="search-bar p-3 shadow-sm bg-white rounded-4" id="searchContainer">
      <Form onSubmit={handleData}>
        <Row className="g-2 align-items-center">
          {/* Where To */}
          <Col md={5}>
            <Form.Label className="fw-bold text-secondary small">Where to</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. - Area, Landmark or Property Name"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            required/>
          </Col>

          {/* Check-in */}
          <Col md={2}>
            <Form.Label className="fw-bold text-secondary small">Check-in</Form.Label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              className="form-control"
              dateFormat="dd MMM ''yy"
            required />
          </Col>

          {/* Check-out */}
          <Col md={2}>
            <Form.Label className="fw-bold text-secondary small">Check-out</Form.Label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              className="form-control"
              dateFormat="dd MMM ''yy"
            required />
          </Col>

          {/* Guests & Rooms */}
          <Col md={3}>
            <Form.Label className="fw-bold text-secondary small">Rooms</Form.Label>
            <Form.Control
              type="text"
              placeholder="No of Rooms"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
           required />
          </Col>
        </Row>

           <Button type="submit" className="mt-3 rounded-3" onClick={handleData}>Search</Button>
      </Form>
    </div>
    
    </div>
    {/* <div className="mt-4">
      {showDestination ? (<Destination destination={destination} checkIn={checkIn} checkOut={checkOut} rooms={rooms}/>):(
        <Home />
      )}
    </div> */}
    </>
}