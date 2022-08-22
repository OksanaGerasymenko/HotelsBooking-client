import React from "react";

const Stars = ({countStars}) => {
   const arr= new Array(countStars).fill("");
    return (
        <span>
            {
                arr.map((star, i) => <img
                    src="https://cdn-icons-png.flaticon.com/512/7802/7802889.png"
                    className="star-icon"
                    alt="star"
                    key={i}
                />)
            }
        </span>
        
    )
       
} 
 
export default Stars;