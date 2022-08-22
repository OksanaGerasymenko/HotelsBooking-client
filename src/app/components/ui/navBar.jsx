import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <nav className="navbar bg-secondary bg-gradient py-0">
            <div className="container-fluid d-flex flex-nowrap justify-content-space-betwen mt-0">
                <Link className="nav-link " aria-current="page" to="/">
                    <div className="d-flex flex-column align-items-center">
                        <img className="logo-img pb-0" src="https://github.com/OksanaGerasymenko/img/blob/main/logo_bg.PNG?raw=true" alt="HB"/>                    
                        <div>𝐇𝐨𝐭𝐞𝐥𝐬𝐁𝐨𝐨𝐤𝐢𝐧𝐠</div> 
                    </div> 
                </Link>
                 <div className="d-flex flex-wrap justify-content-center nav-header p-3">
                 Choose a destination - we will ensure your comfort!
                </div>
                <div className="d-flex">
                    {isLoggedIn
                        ? <NavProfile />
                        : <Link className="nav-link" aria-current="page" to="/login">
                            Login
                        </Link>
                    }
                </div>
            </div>
        </nav>
    )
}
export default NavBar;
