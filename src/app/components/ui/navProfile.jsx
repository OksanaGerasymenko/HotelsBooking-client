import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/users";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUser());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen(prevState => !prevState);
    };
    
    if (!currentUser) return "Loading...";

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">
                    {currentUser.name}
                </div>
                <img
                    src={currentUser.image}
                    className="img-responsive rounded-circle"
                    height="40"
                    alt="img"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link to={`/users/${currentUser._id}`} className="dropdown-item">
                    MyInfo
                </Link>
                {/* <Link className="dropdown-item" aria-current="page" to="/adminDashboard">
                    AdminDashboard
                </Link> */}
                <Link to="/logout" className="dropdown-item">LogOut</Link>
            </div>
        </div>
    );
};
export default NavProfile;