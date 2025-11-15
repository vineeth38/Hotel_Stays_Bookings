
// import { data } from "../../hotels_details"
import { useState, useMemo, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export const Destination = ({ destination }) => {
  const { searchParams } = useContext(UserContext);
  const [params] = useSearchParams();
  const { hotelData, setHotelData } = useContext(UserContext);
  const navigate = useNavigate();

  const cityParam = params.get("city");
  const cityKey = cityParam ? cityParam.toLowerCase().trim() : searchParams.destination;
  // const access = Cookies.get("access");
  useEffect(() => {
    axios.get("https://vineeth38.github.io/Recipes_apis/hotels_details.json")
      .then((response) => {
        setHotelData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [cityKey]);

  // ✅ If city not found, fall back to "for all"
  const hotels = hotelData[cityKey] || hotelData["for all"] || [];

  // --- Filter states ---
  const [priceRange, setPriceRange] = useState([0, 75000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // --- Get unique amenities from all hotels ---
  const allAmenities = useMemo(() => {
    const amenities = new Set();
    hotels.forEach((h) => h.benefits.forEach((b) => amenities.add(b)));
    return Array.from(amenities);
  }, [hotels]);

  // --- Handle checkbox toggles ---
  const toggleRating = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  // --- Filtering logic ---
  const filteredHotels = hotels.filter((hotel) => {
    const priceOk = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    const ratingOk =
      selectedRatings.length === 0 ||
      selectedRatings.includes(Math.floor(hotel.Rating));
    const amenitiesOk =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((a) => hotel.benefits.includes(a));

    return priceOk && ratingOk && amenitiesOk;
  });

  const handleCardClick = (hotel) => {
    navigate(`/hotel/${hotel.id}?destination=${params.get("city")}`);
  };

  return (
    <>
      <h2 id="hotel_heading">
        Hotels in {hotelData[cityKey] ? cityKey : "All Cities"}
      </h2>
      <div className="hotels-container">
        <div className="destination-container">
          <div className="filters">
            <h5>Filters</h5>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label>
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="15000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              />
            </div>

            {/* Star Rating Filter */}
            <div className="filter-group">
              <h6>Star Rating</h6>
              {[4, 5].map((r) => (
                <label key={r}>
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(r)}
                    onChange={() => toggleRating(r)}
                  />
                  {r}★ & above
                </label>
              ))}
            </div>

            {/* Amenities Filter */}
            <div className="filter-group">
              <h6>Amenities</h6>
              {allAmenities.map((a) => (
                <label key={a}>
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(a)}
                    onChange={() => toggleAmenity(a)}
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>

          {/* Hotel Cards */}
          <div className="hotel-list">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="hotel-card"
                onClick={() => handleCardClick(hotel)}
              >
                <img src={hotel.dp} alt={hotel.name} />
                <div className="hotel-info">
                  <h5>{hotel.name}</h5>
                  <p>{hotel.location}</p>
                  <p>⭐ {hotel.Rating} | {hotel.Review}</p>
                  <h4>₹{hotel.price}</h4>
                  <small>{hotel.benefits.join(" • ")}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
