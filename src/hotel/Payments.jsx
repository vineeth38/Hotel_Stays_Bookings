import { useState,useEffect,useContext } from "react";
import { useParams,useSearchParams,useNavigate } from "react-router-dom";
import { FaCentercode, FaRegCreditCard } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
export const Payments = ()=>{
  const {id} = useParams();
  const [searchParam] = useSearchParams();
  const destination=searchParam.get("destination");

  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");

  const isFormComplete = cardNumber && month && year && cvv;
  const navigate = useNavigate()
  // const months = Array.from({ length: 12 }, (_, i) =>
  //   String(i + 1).padStart(2, "0")
  // );
  const months  = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  console.log(months)
  const years = []
  for(let i=1;i<=10;i++){
    let Cyear = 24;
    Cyear+=i;
    years.push(Cyear)
  }
  console.log(years)
  const handlePay = () =>{
    if(!cardNumber || !month || !year || !cvv){
      alert("Please enter all the card details")
    }
    else{
      navigate(`/PaymentVerification/${id}?destination=${destination}`)
    }
  }
       return(
        <div className="card-container">
          <div>
      <h2>Cards</h2>
      {/* Enter card details section */}
      <div className="card">
        
           {/* <FaRegCreditCard className="text-blue-600 text-xl mr-2" /> */}
        {/* <FaCreditCard /> */}
       
        <div>
          <p className="Cheading"><FaCreditCard /> Enter card details</p>
          <p>We support all major domestic & international cards</p>
          <input type="text" placeholder="ENTER CARD NUMBER" value={cardNumber}  onChange={(e) => setCardNumber(e.target.value)} required  maxLength="16" id="cardNum"/>
          <div className="card-inputs"><select placeholder="MM" value={month} onChange={(e) => setMonth(e.target.value)} style={{width:"24%"}}>
            <option value="">MM</option>
            {months.map((m)=>(
              <option key={m}>{m}</option>
            ))}
          </select>
          <select placeholder="YY" value={year} onChange={(e) => setYear(e.target.value)} style={{width:"24%"}}>
            <option value="">YY</option>
            {years.map((y)=>(
              <option key={y}>{y}</option>
            ))}
          </select>
          <input type="password" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} id="cvv" style={{width:"50%"}} maxLength="3"/></div>
          <h4 onClick={handlePay}>PAY</h4>
        </div>
      </div>

      <div className="cardsContainer">
        <div>
          <h4>Secure Payment</h4>
          <p>Your card will be saved securely as per RBI guidelines.</p>
          <div className="card-types">
            <img src="https://imgak.mmtcdn.com/payment-ui-service/images/bank_logos/Visa_network.png" alt="" />
            <img src="https://imgak.mmtcdn.com/payment-ui-service/images/bank_logos/Master_Network.png" alt="" />
            <img src="https://imgak.mmtcdn.com/payment-ui-service/images/bank_logos/Diners_network.png" alt="" />
            <img src="https://imgak.mmtcdn.com/payment-ui-service/images/bank_logos/Rupay_network.png" alt="" />
          </div>
        </div>
        <div>
          <img src="https://imgak.mmtcdn.com/payment-ui-service/images/payment/cb/SecureIcon.png" alt="" />
        </div>
      </div>
    </div>
    </div>
       )
}