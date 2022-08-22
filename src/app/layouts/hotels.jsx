import React from "react";
import { useParams } from "react-router-dom";
import HotelListPage from "../components/pages/hotelListPage";
import HotelPage from "../components/pages/hotelPage";

const Hotels = () => {   
    const { hotelId } = useParams();
    return (
        <>
            {
                hotelId
                    ? <HotelPage id={hotelId} />
                    : <HotelListPage />
            }
        </>
    )
}

export default Hotels;
