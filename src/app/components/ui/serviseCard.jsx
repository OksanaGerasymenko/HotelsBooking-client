import React from "react";
import { useSelector } from "react-redux";
import { getHotelServiceById } from "../../store/hotelServices";

const ServiceCard = ({id}) => {
    const service = useSelector(getHotelServiceById(id));
    const serviceImage = service?.image;
    const serviceName = service?.name;
    return (
        <>
            {
                service && (            
                <div className="hotel-card-service pe-2">                    
                    <img src={serviceImage} alt={serviceName}/>
                    {serviceName}
                </div>
                )
            }
        </>
    );
}
 
export default ServiceCard;