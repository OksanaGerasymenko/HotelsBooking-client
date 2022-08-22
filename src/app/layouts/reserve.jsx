import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserId } from "../store/users";
import { createBooking } from "../store/booking";
import { getRoomById } from "../store/rooms";
import { getHotelById } from "../store/hotels";
import { format } from 'date-fns';

const Reserve = () => {
    const { state } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId, roomId, dateFrom, dateTo, countGuests, countDays } = state;
    const currentUserId = useSelector(getCurrentUserId());
    const room = useSelector(getRoomById(roomId));
    const hotelName = useSelector(getHotelById(room.hotelId)).name;
    const handleCancel = () => {
        history.goBack();
    }
    const handleComplete = () => {
        const data = { 
            dateFrom,
            dateTo,
            roomId,
            roomNumber: room.hotelRoomNumbers[0],
            countGuests
        };
        dispatch(createBooking({data, currentUserId}));
        history.push("/");
    }
    return (
        <>
            {
                userId === currentUserId
                ? (
                    <div className="container mt-5">
                        <div className="d-flex col-md-10 offset-md-1 border border-secondary border-2 rounded p-2">
                            <div className="col-md-4">
                                <img src={room.images[0]} alt={room.name} className="reserve-img" />
                            </div>
                            <div className="col-md-8 ps-2">
                                <div className="fs-2 fw-bold w-100 bg-secondary bg-opacity-50 text-center reserve-title rounded">Room booking confirmation</div>
                                <div className="fs-4">
                                    your hotel:&nbsp;
                                    <span className="fw-bold">{hotelName}</span>
                                </div>
                                <div className="fs-4">
                                    your room:&nbsp;
                                    <span className="fw-bold">{room.name}</span>
                                </div>
                                <div className="fs-4">                                    
                                    <span className="fw-bold">{countDays}</span> nights &nbsp;
                                    from &nbsp;
                                    <span className="fw-bold">{format(dateFrom, 'dd/MM/yyyy')}</span>
                                    &nbsp;&nbsp;to &nbsp;
                                    <span className="fw-bold">{format(dateTo, 'dd/MM/yyyy')}</span>
                                </div>
                                <div className="fs-4">
                                    countGuests:&nbsp;
                                    <span className="fw-bold">{countGuests}</span>
                                </div>
                                <div className="mx-6 d-flex justify-content-around">
                                    <button className="btn btn-reserve-cancel fs-3 p-2 px-4" onClick={handleCancel}>Cancel</button>
                                    <button className="btn btn-reserve-complite fs-3 p-2" onClick={handleComplete}>Complete</button>
                                </div>
                        </div>
                        </div>
                       
                        
                    </div>
                )
                : history.push("/")
            }
        </>
        
    );
}
 
export default Reserve;
