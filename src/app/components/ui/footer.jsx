import React from "react";
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="footer mt-auto py-1 text-dark bg-secondary bg-gradient bg-opacity-75">
            <div className="mx-4">
                <div className="d-flex flex-nowrap">
                    <div className="col-md-4 d-flex align-items-center me-2">
                        <Link to="/">
                            <img className="logo-img-footer pb-0" src="https://github.com/OksanaGerasymenko/img/blob/main/logo_bg.PNG?raw=true" alt="HB"/> 
                        </Link>
                        &copy;2022 HotelsBooking, Inc
                    </div>
                    
                    <div className="col-md-8 d-flex justify-content-end align-items-center">
                        <div>Our contact:</div> 
                        <div className="ms-3">
                            <img className="logo-icon" src="https://github.com/OksanaGerasymenko/CV_OksanaGerasymenko/blob/main/images/phone.png?raw=true" alt="phone"/>
                            (+380)111222333
                        </div>
                        <div className="ms-3">
                            <img className="logo-icon" src="https://github.com/OksanaGerasymenko/CV_OksanaGerasymenko/blob/main/images/email.png?raw=true" alt="e-mail"/> HB@gmail.com
                        </div>                        
                        <div className="ms-3">
                            <a href="https://t.me/OksanaGerasymenko">
                                <img className="logo-icon" src="https://github.com/OksanaGerasymenko/CV_OksanaGerasymenko/blob/main/images/telegram.png?raw=true" alt="@HotelsBooking"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer