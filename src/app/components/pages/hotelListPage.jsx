import React from "react";
import { getHotelsByDestination } from "../../store/hotels";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { getCityById } from "../../store/cities";
import { getCountryById } from "../../store/countries";
import localStorageService from "../../services/localStorage.service";
import HotelCard from "../ui/hotelCard";
import Search from "../ui/search";

const HotelListPage = () => {
    const { state } = useLocation();
    if (state) localStorageService.setSearchData(state);
    const destination = state.destination || "";
    const dateFrom = state.dateFrom || new Date();
    const dateTo = state.dateTo  || new Date();
    const countGuests = state.countGuests || Number(1);
    const hotels = useSelector(getHotelsByDestination(destination));
    const cityName = useSelector(getCityById(destination))?.name;
    const countryName = useSelector(getCountryById(destination))?.name;
    const destinationName = cityName || countryName || "all destination";
    const countDays = dateTo-dateFrom === 0
        ? 1
        : (dateTo - dateFrom) / 1000 / 60 / 60 / 24    
    
    return (
        <div className="container my-5">
            <Search />
            <div className="d-flex flex-column align-items-center">
                <div className="col-md-10 py-4 hotel-list-title text-center">
                    <h3>Hotels according to your request: {hotels.length} variants</h3>
                    <h5>{`${destinationName}, ${countDays} nights, ${countGuests} guests`}</h5>
                </div>
                <div className="d-flex justify-content-center">                    
                    <div className="col-md-10 mx-3">                    
                        {
                            hotels &&
                            hotels.map( hotel =>
                                <div className="mb-3 shadow border border-1 border-secondary rounded" key={hotel._id}>
                                    <HotelCard
                                        id={hotel._id}
                                        key={hotel._id}
                                        dateFrom={dateFrom}
                                        dateTo={dateTo}
                                        countGuests={countGuests}
                                    />
                                </div>                                
                            )
                        }  
                    </div>                
                </div>
            </div>
        </div> 
    )
}

export default HotelListPage
