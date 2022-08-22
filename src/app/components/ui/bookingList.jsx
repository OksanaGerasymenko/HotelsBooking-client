import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { orderBy } from "lodash";
import { getBookingByUserId, getBookingLoadingStatus, removeBooking } from "../../store/booking";
import Loader from "../common/loader";
import BookingCard from "./bookingCard";

const BookingList = ({ userId }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getBookingLoadingStatus());
    const booking = useSelector(getBookingByUserId(userId));
    const sorteredBooking = orderBy(booking, ["created_at"], "desc");
    const handleRemove = (id) => {
        dispatch(removeBooking(id))
    }
    
    return (
        <div className="card mb-2 rounded shadow user-card bg-light">
           <div className="d-flex flex-column">
                <h2 className="text-center mt-5"> My booking</h2>
                {
                    !isLoading
                    ? (
                        booking?.length
                        ? (
                            <div className="bg-light card-body mb-3">
                                <div className="row">
                                    <div className="col">
                                        {sorteredBooking.map(b =>
                                            <BookingCard booking={b} key={b._id} onRemove={handleRemove} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                        : (<div className="fs-4 mt-5">You don't have any hotels booked yet</div>)
                    )
                    : <Loader />
                }
           </div>
        </div>
    );
}
BookingList.propTypes = {
    userId: PropTypes.string.isRequired
};
export default BookingList;

