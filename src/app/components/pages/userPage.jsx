import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/users";
import UserCard from "../ui/userCard";
import BookingList from "../ui/bookingList";

const UserPage = () => {
    const user = useSelector(getCurrentUser());
    return (
        <div className="container mt-5">
            {user
                ? <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user}/>                        
                    </div>
                    <div className="col-md-8">
                        <BookingList userId={user._id} />
                    </div>
                </div>
                : "Loading..."
            }
        </div>
    );
}

export default UserPage