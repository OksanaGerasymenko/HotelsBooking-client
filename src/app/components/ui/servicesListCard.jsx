import React from "react";
import ServiceCard from "./serviseCard";

const ServiceListCard = ({ serviceIds }) => {
    return (
        <div className="d-flex justify-content-start">
            {serviceIds.map(serviceId => 
                <ServiceCard id={serviceId} key={serviceId} />
            )}
        </div>
    );
}
 
export default ServiceListCard;