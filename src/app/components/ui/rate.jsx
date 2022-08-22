import React from "react";
import { getRateName } from "../../utils/rateName";

const Rate = ({rate}) => {
   const rateName = getRateName(rate);
    return (
        <span>
           <span className="fw-bold">{rateName}</span>
           <div className="rate">{rate}</div>
        </span>
        
    )
       
} 
 
export default Rate;