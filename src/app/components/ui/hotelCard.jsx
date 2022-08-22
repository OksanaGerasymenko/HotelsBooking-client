import React from "react";
import Stars from "./stars";
import Rate from "../ui/rate";
import { useSelector} from "react-redux";
import { getMinRoomPriceByHotelId } from "../../store/rooms";
import { useHistory} from "react-router-dom";
import ServiceListCard from "./servicesListCard";
import { getHotelById } from "../../store/hotels";

const HotelCard = ({ id, dateFrom, dateTo, countGuests }) => {
    const history = useHistory()
    const hotel = useSelector(getHotelById(id));    
    const minPrice = useSelector(getMinRoomPriceByHotelId(hotel._id));
    const handleClick = () => {
        history.push({
            pathname: `/hotels/${hotel._id}`,
            state: { dateFrom, dateTo, countGuests}
        })
    }
    return (
        <div className="d-flex p-2">
            <div className="col-md-3">
                <img src={hotel.images[0]} className="hotel-card-img" alt={hotel.name}/>
            </div>
            <div className="col-md-8 p-2">
                <div className="d-flex align-items-top" >
                    <h3 className="me-2">{hotel.name}</h3>
                    <Stars countStars={hotel.stars} />   
                </div>     
                <h5>{hotel.address}</h5>      
                <p>{hotel.description}</p>
                <ServiceListCard serviceIds={hotel.servicesFree} />
            </div>
            <div className="col-md-1">
                <div className="d-flex align-items-end flex-column h-100">
                    <div>
                        <Rate rate={hotel.rate} />
                        {
                            minPrice > 0 
                                ? <div>from ${minPrice} </div>
                                : ""
                        }
                    </div>
                    <div className="mt-auto">
                    <button className="btn btn-secondary" onClick={handleClick}>
                        Details    
                    </button>
                    </div>                            
                </div>             
            </div>
        </div>
     );
}
 
export default HotelCard;