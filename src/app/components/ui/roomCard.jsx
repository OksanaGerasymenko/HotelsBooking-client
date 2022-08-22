import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import {getIsLoggedIn, getCurrentUserId } from "../../store/users";
import { differenceInDays } from "date-fns";

const RoomCard = ({ room, dateFrom, dateTo, countGuests }) => {
    const history = useHistory();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userId = useSelector(getCurrentUserId());    
    const countDays = differenceInDays(Date.parse(dateTo), Date.parse(dateFrom)) || Number(1);
    const priceAllDays = room.price * countDays;
    const handleReserve = () => {        
        if (!isLoggedIn) {
            history.push("/login")
        }else {
           history.push({
            pathname: "/reserve",
            state: {
                userId,
                dateFrom,
                dateTo,
                countGuests,
                countDays,
                roomId: room._id
            }
           })
        };
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (
        <div className="d-flex p-2 border border-secondary border-2 rounded">
            <div className="col-md-7">
            <div className="room-slider-container">
                    <Slider {...settings}>
                        {room.images.map (image => <div className="hotel-page-slide" key={image}>
                            <img src={image} alt={room.name} className="hotel-page-slide-img" />
                            </div>)}
                    </Slider>
                </div>                
            </div>
            <div className="col-md-5 p-3 pb-0">
                <div className="d-flex flex-column" >
                    <div>
                        <h3 className="me-2">{room.name}</h3>
                        <h6>{room.description}</h6>
                        <div className="fs-6">${room.price} for 1 hight</div> 
                    </div>                    
                    <div className="d-flex flex-column align-items-end p-2 mb-4">
                        <div className="fw-bold">{`${countDays} nights, ${countGuests} guests`}</div>
                        <div className="room-price">${priceAllDays}</div>
                        <p className="fst-italic">Includes taxes and fees</p>
                    </div>
                    <div className="mt-auto d-flex flex-column align-items-end">
                        <button className="reserve-btn" onClick={handleReserve}>I`ll reserve</button>
                        <p className="note">Don't worry – clicking this button won't charge you anything!</p>
                    </div>
                    
                </div>     
                      
                
                
            </div>
            
        </div>
     );
}
 
export default RoomCard;