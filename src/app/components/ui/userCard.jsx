import React from "react";
import PropTypes from "prop-types";

const UserCard = ({ user }) => {
    const handleEdit = () => {
        console.log("edit");
    }
    return (
        <div className="card mb-2 rounded shadow user-card bg-light">
            <div className="card-body">
                <button
                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                    onClick={handleEdit}
                >
                    <i className="bi bi-gear"></i>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={user.image}
                        className="rounded-circle"
                        width="150"
                        alt={user.name}
                    />
                    <div className="mt-3 fs-2 fw-bold"> {user.name}</div>
                    <div className="mt-3 fs-6">
                        contact info&nbsp;&nbsp;
                        <span className="fs-4 fw-bold">{user.contactInfo}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
UserCard.propTypes = {
    user: PropTypes.object
};
export default UserCard;