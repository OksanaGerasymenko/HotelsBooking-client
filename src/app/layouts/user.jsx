import React from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getCurrentUserId } from "../store/users";
import UserPage from "../components/pages/userPage";

const User = () => {
    const { userId } = useParams();
    const history = useHistory();
    const currentUserId = useSelector(getCurrentUserId());
    return (
        <>
            {
                userId === currentUserId
                ? <UserPage userId={userId} />
                : history.push(`/users/${currentUserId}`)
            }
        </>
    )
}

export default User;