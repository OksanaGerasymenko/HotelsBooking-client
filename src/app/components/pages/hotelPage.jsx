import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useLocation} from "react-router-dom";
import {getHotelById} from "../../store/hotels";
import Stars from "../ui/stars";
import Rate from "../ui/rate";
import ServiceListCard from "../ui/servicesListCard";
import { getRoomsByHotelId } from "../../store/rooms";
import RoomCard from "../ui/roomCard";
import Slider from "react-slick";
import localStorageService from "../../services/localStorage.service";
import { addDays } from "date-fns";


const HotelPage = () => {
    const { state } = useLocation();
    const dateFrom = state?.dateFrom || localStorageService.getSearchDataDateFrom() || new Date();
    const dateTo = state?.dateTo || localStorageService.getSearchDataDateTo() || addDays(new Date(), 1);
    const countGuests = state?.countGuests || localStorageService.getSearchDataCountGuests() || Number(1);
    const { hotelId } = useParams();
    const hotel = useSelector(getHotelById(hotelId));
    const rooms = useSelector(getRoomsByHotelId(hotelId));
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return (        
        <div className="container mt-5">
            <div className="d-flex flex-column col-md-10 offset-md-1">
                <div className="d-flex hotel-page-container">
                    <div className="d-flex align-items-top" >
                        <h1>{hotel.name}</h1>
                        <Stars countStars={hotel.stars} />   
                    </div>
                    <div className="ms-auto">
                        <Rate rate={hotel.rate} />
                    </div>                    
                </div>
                <div className="hotel-page-container mt-2">
                    <Slider {...settings}>
                        {hotel.images.map (image => <div className="hotel-page-slide" key={image}>
                            <img src={image} alt={hotel.name} className="hotel-page-slide-img" />
                            </div>)}
                    </Slider>
                </div>
                <div className="hotel-page-container mt-4 fs-3">
                    <div>
                        destination to center: &nbsp;
                        <span className="fw-bold">{hotel.distToCenter}</span>
                    </div>
                    <div>
                        destination to airport: &nbsp;  
                        <span className="fw-bold">{hotel.distToAirport}</span>
                    </div>
                    <div>
                        destination to railway station: &nbsp; 
                        <span className="fw-bold">{hotel.distToRailwayStation}</span>
                    </div>   
                </div>
                <div className="hotel-page-container mt-4">
                    <div className="d-flex align-items-center">
                        <span className="fs-4 fw-bold"> Free services:&nbsp;</span>
                        <ServiceListCard serviceIds={hotel.servicesFree} />  
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="fs-4 fw-bold"> Paid services:&nbsp;</span>
                        <ServiceListCard serviceIds={hotel.servicesPaid} />  
                    </div>            
                </div>
                <div className="hotel-page-container mt-4 fs-5">
                    {hotel.description}
                </div>
                <div className="hotel-page-container my-4">
                    {
                        rooms?.map(room => <RoomCard
                            room={room}
                            key={room._id}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            countGuests={countGuests}
                        />)
                    }
                </div>
            </div>

           
          
        </div>
    )
}

export default HotelPage