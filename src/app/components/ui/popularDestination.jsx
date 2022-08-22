import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getPopularDestinationHotels } from "../../store/hotels";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const PopularDestination = () => {
    const history = useHistory();
    const popularHotels = useSelector(getPopularDestinationHotels());
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    const handleClick = (hotelId) => {
        history.push(`hotels/${hotelId}`)
    }
    return (       
        <div className="slider-container">
            <h1 className="fw-bold">Popular destination</h1>
            <Slider {...settings}>
                {
                    popularHotels.map(hotel => (                        
                            <div
                              className="slider-card text-center"
                              key={hotel._id}
                              onClick={() => handleClick(hotel.hotelId)}
                              role="button"                              
                            >
                                <div className="slider-card-top" >                                   
                                    <img src={hotel.image} alt={hotel.name}/>                                                                
                                </div>
                                <div className="slider-card-bottom">
                                    <h2 >{hotel.name}</h2>
                                    <h3>{hotel.address}</h3>
                                </div>
                    
                            </div>
                        
                    ))
                }
            </Slider>
            
        </div>
    )
}
export default PopularDestination