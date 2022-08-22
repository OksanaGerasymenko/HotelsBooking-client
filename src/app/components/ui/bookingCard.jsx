import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getRoomById } from "../../store/rooms";
import { getHotelById } from "../../store/hotels";
import { format, differenceInDays } from 'date-fns';

const BookingCard = ({ booking, onRemove }) => {
    const room = useSelector(getRoomById(booking.roomId));
    const hotel = useSelector(getHotelById(room.hotelId));
    const dateFrom = Date.parse(booking.dateFrom);
    const dateTo = Date.parse(booking.dateTo);
    const countDays = differenceInDays(dateTo, dateFrom);   
    const priceAllDays = room.price * countDays;
    
    return (
        <div className="card m-2 p-2 booking-card">
            <button
                className="position-absolute top-0 end-0 btn btn-light btn-sm"
                onClick={() => onRemove(booking._id)}
                >
                    <i class="bi bi-x-square-fill"></i>
            </button>
            <div className="d-flex">
                <div className="col-md-4 p-2">
                    <img src={hotel.images[0]} alt={hotel.name} className="booking-card-img" />
                </div>
                <div className="col-md-8 d-flex flex-column">
                    <div className="fs-6">
                        your hotel:&nbsp;
                        <span className="fw-bold">{hotel.name}</span>
                    </div>
                    <div className="fs-6">
                        your room:&nbsp;
                        <span className="fw-bold">{room.name}</span>
                    </div>
                    <div className="fs-6">                                    
                        <span className="fw-bold">{countDays}</span> nights &nbsp;
                        from &nbsp;
                        <span className="fw-bold">{format(dateFrom, 'dd/MM/yyyy')}</span>
                        &nbsp;&nbsp;to &nbsp;
                        <span className="fw-bold">{format(dateTo, 'dd/MM/yyyy')}</span>
                    </div>
                    <div className="fs-6">
                        countGuests:&nbsp;
                        <span className="fw-bold">{booking.countGuests}</span>
                    </div>
                    <div className="fs-4 text-end mt-auto">
                        price:&nbsp;
                        <span className="fw-bold">{priceAllDays}</span>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
BookingCard.propTypes = {
    booking : PropTypes.object,
    onRemove: PropTypes.func
}
export default BookingCard;